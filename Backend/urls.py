from django.contrib import admin
from django.urls import path, include
from .views import index
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path("", include("Accounts.urls")),
    path("", include("DiseasePredictor.urls")),
    path("contactdoctor", index),
    path("dashboard", index),
    path('icon.svg', RedirectView.as_view(url=staticfiles_storage.url('icon-37ad67e6.svg')))
]

