from Accounts.models import patient_data
from django.shortcuts import render

def data(request):
    Data = patient_data.objects.all()
    #return render(request, 'data.html', {'Data': Data})

