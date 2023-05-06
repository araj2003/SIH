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

data = read_frame(symptoms_diseases.objects.all())
unique1 = data['prognosis'].unique()

data_dict = data.to_dict('records')
context = {'data': data_dict}

train, X, Y = scale_dataset(data, oversample=True)

svm_model = SVC(probability=True)
svm_model = svm_model.fit(X, Y)


@api_view()
def model(request, symptoms=''):
    x = np.asarray(list(symptoms), dtype=np.int)
    print(x)
    x = x.reshape(-1, 1)
    scaler = StandardScaler()
    x = scaler.fit_transform(x)

    x_ = x.reshape(1, -1)
    Y_ = svm_model.predict(x_)

    probas = svm_model.predict_proba(x_)

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
    

