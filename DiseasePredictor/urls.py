from django.urls import path
from .views import model

urlpatterns = [
    path('prediction/<str:symptoms>/', model),
]
