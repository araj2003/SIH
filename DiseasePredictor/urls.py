from django.urls import path
from .views import model, insert_patient_data

urlpatterns = [
    path('prediction/<str:symptoms>/', model),
    path('insertpd', insert_patient_data),
]
