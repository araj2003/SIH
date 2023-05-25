from django.db import connection
from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, PatientSerializer, UserSerializer, DoctorProfileSerializer
from rest_framework import permissions, status, generics
from .validations import custom_validation, validate_email, validate_password
from .models import DoctorProfile


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    ##

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class PatientProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        profile = request.user.profile

        if not profile:
            return Response({'error': 'User does not have a profile'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PatientSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = PatientSerializer(
            request.user.profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorProfileListAPIView(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer

    def get_queryset(self):
        speciality = self.kwargs.get('sp', '')
        queryset = DoctorProfile.objects.filter(speciality__icontains=speciality)
        return queryset



def insert_data(request):
    query = """
        INSERT INTO "Accounts_doctorprofile" (name, speciality, experience, work_address, mobile_no, image_link, profile_link)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
    """
    values = [
        ('Dr. Pankaj Rao', 'Dentist', 17, 'E-517, Rohit Plaza, Sector 7, Ramphal Chowk, Delhi', '0011001100', 'https://imagesx.practo.com/providers/dr-pankaj-rao-endodontist-delhi-277153c0-1b5f-49cb-9b86-96c94cc09e0c.jpg?i_type=t_100x100',
         'https://www.practo.com/delhi/doctor/dr-pankaj-rao-dentist?practice_id=676006&specialization=Dentist&referrer=doctor_listing'),
        ('Dr. Rajat Sachdeva', 'Dentist', 17, 'I - 101, Phase 1, Landmark: Near Grammar School, Delhi', '0111101100', 'https://imagesx.practo.com/providers/dr-rajat-sachdeva-implantologist-delhi-21960fca-0004-4742-8cda-bbbbc6cfacb9.jpg?i_type=t_100x100',
         'https://www.practo.com/delhi/doctor/dr-rajat-sachdeva-dentist?practice_id=652415&specialization=Dentist&referrer=doctor_listing'),
        ('Dr. Dheeraj Setia', 'Dentist', 22, 'S - 115, Landmark: Near Hauz Khas Metro Station, Delhi', '1011001101', 'https://imagesx.practo.com/providers/dr-dheeraj-setia-endodontist-delhi-ee381d8f-2186-4d54-9270-01c6dc59ff84.jpg?i_type=t_100x100',
         'https://www.practo.com/delhi/doctor/dr-dheeraj-setia-dentist?practice_id=1416653&specialization=Dentist&referrer=doctor_listing'),
        ('Dr. Ruchi Gupta', 'Dentist', 16, 'LP-14C, Maurya Enclave, Landmark: Opposite Hotel City Park, Delhi', '0111111100', 'https://imagesx.practo.com/providers/dr-ruchi-gupta-dentist-delhi-41fd8a76-c78b-4571-bd4e-d814a1c9269a.jpg?i_type=t_100x100',
         'https://www.practo.com/delhi/doctor/dr-ruchi-gupta-1-dentist?practice_id=712546&specialization=Dentist&referrer=doctor_listing'),
        ('Dr. Aparna Singhal', 'Dentist', 15, '39/35, Main Rohtak Road, Punjabi Bagh West, Landmark: Shivaji Park Metro Station & Opposite Metro Pillar Number 145, Delhi', '0010001100', 'https://imagesx.practo.com/providers/dr-aparna-singhal-dentist-delhi-d22bb2a7-ccd7-4604-9015-09e11f9d5e19.jpg?i_type=t_100x100', 'https://www.practo.com/delhi/doctor/dr-aparna-singhal-2-dentist?practice_id=954839&specialization=Dentist&referrer=doctor_listing'),
    ]

    with connection.cursor() as cursor:
        cursor.executemany(query, values)

        return render(request, 'index.html')
