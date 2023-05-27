from Accounts.models import symptoms_diseases, Predicted_Diseases
from Accounts.serializers import PredictionSerializer
from django.shortcuts import render
import pandas as pd
import numpy as np
from django_pandas.io import read_frame
from imblearn.over_sampling import RandomOverSampler
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from rest_framework.decorators import api_view
from rest_framework.response import Response
import csv
from django.db import transaction
import os

def insert_patient_data(request):
    data = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'Training.csv')
    with open(data, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row

        with transaction.atomic():
            for row in reader:
                # Map the values from the CSV row to the model fields
                symptom_values = [int(value) for value in row[:-1]]  # Exclude the last column
                prognosis = row[-1]

                # Create a new instance of the model
                field_names = [field.name for field in symptoms_diseases._meta.get_fields() if field.name != 'id' and field.name != 'prognosis']
                field_values = dict(zip(field_names, symptom_values))
                instance = symptoms_diseases.objects.create(prognosis=prognosis, **field_values)

                # Save the instance to the database
                instance.save()

            return render(request, 'index.html')

def scale_dataset(dataframe, oversample=False):
    X = dataframe[dataframe.columns[:-1]].values
    y = dataframe[dataframe.columns[-1]].values

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    if oversample:
        ros = RandomOverSampler()
        X, y = ros.fit_resample(X, y)

    data = np.hstack((X, np.reshape(y, (-1, 1))))

    return data, X, y


@api_view()
def model(request, symptoms=''):
    data = read_frame(symptoms_diseases.objects.all())
    unique1 = data['prognosis'].unique()

    data_dict = data.to_dict('records')
    context = {'data': data_dict}

    # Exclude the first column from the dataset
    train, X, Y = scale_dataset(data.iloc[:, 1:], oversample=True)
    print(X)
    print(Y)

    svm_model = SVC(probability=True)
    svm_model = svm_model.fit(X, Y)  # Exclude last column from X

    x = np.asarray(list(symptoms), dtype=np.int_)
    x = x.reshape(1, -1)  # Reshape to a row vector

    # Exclude the first column from x
    x = x[:, :-1]

    scaler = StandardScaler()
    x = scaler.fit_transform(x)

    Y_ = svm_model.predict(x)

    probas = svm_model.predict_proba(x)

    top5_indices = np.argsort(probas, axis=1)[:, -5:]
    top5_values = np.take_along_axis(probas, top5_indices, axis=1)

    # Get the corresponding class labels
    top5_labels = svm_model.classes_[top5_indices]

    # Print the top 5 class labels for the first sample in the test data
    pd = top5_labels[0][::-1].tolist()
    pd_prob = top5_values[0][::-1].astype(float).tolist()

    Predicted_Diseases.objects.all().delete()
    Predicted_Diseases(diseases=pd, diseases_prob=pd_prob).save()
    data = Predicted_Diseases.objects.all()
    serializer = PredictionSerializer(data, many=True)
    return Response(serializer.data, template_name=None)

