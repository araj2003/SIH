from Accounts.models import patient_data
from django.shortcuts import render
import pandas as pd
import numpy as np
from django_pandas.io import read_frame
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

data = read_frame(patient_data.objects.all())
unique1 = data['prognosis'].unique()

data_dict = data.to_dict('records')
context = {'data': data_dict}

train, X, Y = scale_dataset(data, oversample=True)

svm_model = SVC(probability=True)
svm_model = svm_model.fit(X, Y)


def model(request):
    x = np.zeros(130)
    x[98] = 1
    x[96] = 1
    x[47] = 1
    x[36] = 1
    x[35] = 1
    x[34] = 1
    x[33] = 1
    x[2] = 1
    x[4] = 1
    x[5] = 1
    x[10] = 1
    x[13] = 1

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
    print(top5_labels[0][::-1])
    print(top5_values[0][::-1])
    print(unique1)
    print(probas)
    return render(request, 'index.html', context)

    

