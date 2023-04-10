from Accounts.models import patient_data
from django.shortcuts import render
import pandas as pd
import numpy as np
from django_pandas.io import read_frame
from sklearn import preprocessing
from imblearn.over_sampling import RandomOverSampler
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB

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
    label_encoder = preprocessing.LabelEncoder()
    data['prognosis'] = label_encoder.fit_transform(data['prognosis'])
    unique2 = data['prognosis'].unique()

    data_dict = data.to_dict('records')
    context = {'data': data_dict}

    train, X, Y = scale_dataset(data, oversample=True)

    nb_model = GaussianNB()
    nb_model = nb_model.fit(X, Y)
    x = np.zeros(130)
    x_ = x.reshape(1, -1)
    Y_ = nb_model.predict(x_)
    indices = np.where(unique2 == Y_)[0]
    
    print(unique1)
    print(unique2)
    print(unique1[indices[0]])
    return render(request, 'data.html', context)

    

