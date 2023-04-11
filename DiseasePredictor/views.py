from Accounts.models import patient_data
from django.shortcuts import render
import pandas as pd
import numpy as np
from django_pandas.io import read_frame
from sklearn import preprocessing
from imblearn.over_sampling import RandomOverSampler
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

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


def model(request):
    data = read_frame(patient_data.objects.all())
    unique1 = data['prognosis'].unique()

    data_dict = data.to_dict('records')
    context = {'data': data_dict}

    train, X, Y = scale_dataset(data, oversample=True)

    svm_model = SVC(probability=True)
    svm_model = svm_model.fit(X, Y)
    x = np.zeros(130)
    x[1] = 1
    x[0] = 1
    x_ = x.reshape(1, -1)
    Y_ = svm_model.predict(x_)

    probas = svm_model.predict_proba(x_)

    top5_indices = np.argsort(probas, axis=1)[:, -5:]

    # Get the corresponding class labels
    top5_labels = svm_model.classes_[top5_indices]

    # Print the top 5 class labels for the first sample in the test data
    print(top5_labels[0][::-1])

    print(unique1)
    print(probas)
    return render(request, 'data.html', context)

    

