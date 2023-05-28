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
        INSERT INTO "Accounts_doctorprofile" (name, speciality, sex, experience, work_address, mobile_no, image_link, profile_link)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """
    values = [
    (
        'Dr. Emily Smith',
        'Cardiologist',
        'female',
        12,
        '123 Oak Street, Chicago',
        '9876543210',
        'https://example.com/doctor-emily-smith.jpg',
        'https://www.example.com/doctors/emily-smith'
    ),
    (
        'Dr. John Johnson',
        'Pediatrician',
        'male',
        8,
        '456 Elm Avenue, Los Angeles',
        '1234567890',
        'https://example.com/doctor-john-johnson.jpg',
        'https://www.example.com/doctors/john-johnson'
    ),
    (
        'Dr. Emma Davis',
        'Dermatologist',
        'female',
        15,
        '789 Maple Lane, New York',
        '5551234567',
        'https://example.com/doctor-emma-davis.jpg',
        'https://www.example.com/doctors/emma-davis'
    ),
    (
        'Dr. Michael Wilson',
        'Orthopedic Surgeon',
        'male',
        20,
        '321 Pine Street, San Francisco',
        '9876543210',
        'https://example.com/doctor-michael-wilson.jpg',
        'https://www.example.com/doctors/michael-wilson'
    ),
    (
        'Dr. Olivia Anderson',
        'Gynecologist',
        'female',
        10,
        '567 Cedar Avenue, Houston',
        '1234567890',
        'https://example.com/doctor-olivia-anderson.jpg',
        'https://www.example.com/doctors/olivia-anderson'
    ),
    (
        'Dr. Benjamin Garcia',
        'Ophthalmologist',
        'male',
        18,
        '789 Oak Street, Miami',
        '5559876543',
        'https://example.com/doctor-benjamin-garcia.jpg',
        'https://www.example.com/doctors/benjamin-garcia'
    ),
    (
        'Dr. Sophia Lee',
        'Psychiatrist',
        'female',
        14,
        '234 Elm Avenue, Seattle',
        '9876543210',
        'https://example.com/doctor-sophia-lee.jpg',
        'https://www.example.com/doctors/sophia-lee'
    ),
    (
        'Dr. Alexander Brown',
        'General Surgeon',
        'male',
        22,
        '789 Oak Street, Atlanta',
        '5551234567',
        'https://example.com/doctor-alexander-brown.jpg',
        'https://www.example.com/doctors/alexander-brown'
    ),
    (
        'Dr. Chloe Martinez',
        'Neurologist',
        'female',
        9,
        '456 Pine Lane, Dallas',
        '1234567890',
        'https://example.com/doctor-chloe-martinez.jpg',
        'https://www.example.com/doctors/chloe-martinez'
    ),
    (
        'Dr. William Taylor',
        'ENT Specialist',
        'male',
        16,
        '321 Elm Avenue, Boston',
        '5559876543',
        'https://example.com/doctor-william-taylor.jpg',
        'https://www.example.com/doctors/william-taylor'
    ),
    (
        'Dr. Harper Rodriguez',
        'Endocrinologist',
        'female',
        11,
        '789 Oak Street, Phoenix',
        '9876543210',
        'https://example.com/doctor-harper-rodriguez.jpg',
        'https://www.example.com/doctors/harper-rodriguez'
    ),
    (
        'Dr. Ethan Turner',
        'Rheumatologist',
        'male',
        7,
        '234 Pine Lane, Denver',
        '5551234567',
        'https://example.com/doctor-ethan-turner.jpg',
        'https://www.example.com/doctors/ethan-turner'
    ),
    (
        'Dr. Lily Harris',
        'Dentist',
        'female',
        13,
        '567 Cedar Avenue, Austin',
        '1234567890',
        'https://example.com/doctor-lily-harris.jpg',
        'https://www.example.com/doctors/lily-harris'
    ),
    (
        'Dr. Gabriel Clark',
        'Orthodontist',
        'male',
        19,
        '789 Oak Street, San Diego',
        '5559876543',
        'https://example.com/doctor-gabriel-clark.jpg',
        'https://www.example.com/doctors/gabriel-clark'
    ),
    (
        'Dr. Aria Walker',
        'Dermatologist',
        'female',
        16,
        '321 Elm Avenue, Nashville',
        '9876543210',
        'https://example.com/doctor-aria-walker.jpg',
        'https://www.example.com/doctors/aria-walker'
    ),
    (
        'Dr. Samuel Evans',
        'Gastroenterologist',
        'male',
        14,
        '789 Oak Street, Portland',
        '5551234567',
        'https://example.com/doctor-samuel-evans.jpg',
        'https://www.example.com/doctors/samuel-evans'
    ),
    (
        'Dr. Scarlett Cooper',
        'Psychologist',
        'female',
        10,
        '456 Pine Lane, Las Vegas',
        '1234567890',
        'https://example.com/doctor-scarlett-cooper.jpg',
        'https://www.example.com/doctors/scarlett-cooper'
    ),
    (
        'Dr. Noah Turner',
        'Urologist',
        'male',
        18,
        '567 Cedar Avenue, Charlotte',
        '5559876543',
        'https://example.com/doctor-noah-turner.jpg',
        'https://www.example.com/doctors/noah-turner'
    ),
    (
        'Dr. Ava Rodriguez',
        'Oncologist',
        'female',
        12,
        '789 Oak Street, San Antonio',
        '9876543210',
        'https://example.com/doctor-ava-rodriguez.jpg',
        'https://www.example.com/doctors/ava-rodriguez'
    ),
    (
        'Dr. Daniel Collins',
        'Neurosurgeon',
        'male',
        9,
        '234 Pine Lane, Philadelphia',
        '5551234567',
        'https://example.com/doctor-daniel-collins.jpg',
        'https://www.example.com/doctors/daniel-collins'
    ),
    (
        'Dr. Penelope Martinez',
        'Dentist',
        'female',
        15,
        '567 Cedar Avenue, Minneapolis',
        '1234567890',
        'https://example.com/doctor-penelope-martinez.jpg',
        'https://www.example.com/doctors/penelope-martinez'
    ),
    (
        'Dr. James Wright',
        'Plastic Surgeon',
        'male',
        20,
        '789 Oak Street, Detroit',
        '5559876543',
        'https://example.com/doctor-james-wright.jpg',
        'https://www.example.com/doctors/james-wright'
    ),
    (
        'Dr. Harper Mitchell',
        'Psychiatrist',
        'female',
        14,
        '321 Elm Avenue, Baltimore',
        '9876543210',
        'https://example.com/doctor-harper-mitchell.jpg',
        'https://www.example.com/doctors/harper-mitchell'
    ),
    (
        'Dr. Logan Hughes',
        'Ophthalmologist',
        'male',
        17,
        '789 Oak Street, Seattle',
        '5551234567',
        'https://example.com/doctor-logan-hughes.jpg',
        'https://www.example.com/doctors/logan-hughes'
    ),
    (
        'Dr. Stella Brooks',
        'Dermatologist',
        'female',
        11,
        '456 Pine Lane, Houston',
        '1234567890',
        'https://example.com/doctor-stella-brooks.jpg',
        'https://www.example.com/doctors/stella-brooks'
    ),
    (
        'Dr. Nathan Turner',
        'ENT Specialist',
        'male',
        16,
        '567 Cedar Avenue, Miami',
        '5559876543',
        'https://example.com/doctor-nathan-turner.jpg',
        'https://www.example.com/doctors/nathan-turner'
    ),
    (
        'Dr. Bella Evans',
        'Gynecologist',
        'female',
        13,
        '789 Oak Street, Atlanta',
        '9876543210',
        'https://example.com/doctor-bella-evans.jpg',
        'https://www.example.com/doctors/bella-evans'
    ),
    (
        'Dr. Isaac Martinez',
        'Endocrinologist',
        'male',
        8,
        '234 Pine Lane, Dallas',
        '5551234567',
        'https://example.com/doctor-isaac-martinez.jpg',
        'https://www.example.com/doctors/isaac-martinez'
    ),
    (
        'Dr. Violet Anderson',
        'Orthopedic Surgeon',
        'female',
        20,
        '567 Cedar Avenue, Phoenix',
        '1234567890',
        'https://example.com/doctor-violet-anderson.jpg',
        'https://www.example.com/doctors/violet-anderson'
    ),
    (
        'Dr. Elijah Wilson',
        'Rheumatologist',
        'male',
        9,
        '789 Oak Street, Denver',
        '5559876543',
        'https://example.com/doctor-elijah-wilson.jpg',
        'https://www.example.com/doctors/elijah-wilson'
    ),
    (
        'Dr. Aurora Thompson',
        'Dentist',
        'female',
        15,
        '321 Elm Avenue, Austin',
        '9876543210',
        'https://example.com/doctor-aurora-thompson.jpg',
        'https://www.example.com/doctors/aurora-thompson'
    ),
    (
        'Dr. Eli Collins',
        'Orthodontist',
        'male',
        19,
        '789 Oak Street, San Diego',
        '5551234567',
        'https://example.com/doctor-eli-collins.jpg',
        'https://www.example.com/doctors/eli-collins'
    ),
    (
        'Dr. Nora Walker',
        'Dermatologist',
        'female',
        16,
        '456 Pine Lane, Nashville',
        '1234567890',
        'https://example.com/doctor-nora-walker.jpg',
        'https://www.example.com/doctors/nora-walker'
    ),
    (
        'Dr. Luke Evans',
        'Gastroenterologist',
        'male',
        14,
        '789 Oak Street, Portland',
        '5559876543',
        'https://example.com/doctor-luke-evans.jpg',
        'https://www.example.com/doctors/luke-evans'
    ),
    (
        'Dr. Grace Cooper',
        'Psychologist',
        'female',
        10,
        '234 Pine Lane, Las Vegas',
        '9876543210',
        'https://example.com/doctor-grace-cooper.jpg',
        'https://www.example.com/doctors/grace-cooper'
    ),
    (
        'Dr. Oliver Turner',
        'Urologist',
        'male',
        18,
        '567 Cedar Avenue, Charlotte',
        '5551234567',
        'https://example.com/doctor-oliver-turner.jpg',
        'https://www.example.com/doctors/oliver-turner'
    ),
    (
        'Dr. Hazel Rodriguez',
        'Oncologist',
        'female',
        12,
        '789 Oak Street, San Antonio',
        '1234567890',
        'https://example.com/doctor-hazel-rodriguez.jpg',
        'https://www.example.com/doctors/hazel-rodriguez'
    ),
    (
        'Dr. Henry Collins',
        'Neurosurgeon',
        'male',
        9,
        '234 Pine Lane, Philadelphia',
        '5559876543',
        'https://example.com/doctor-henry-collins.jpg',
        'https://www.example.com/doctors/henry-collins'
    ),
    (
        'Dr. Luna Martinez',
        'Dentist',
        'female',
        15,
        '567 Cedar Avenue, Minneapolis',
        '9876543210',
        'https://example.com/doctor-luna-martinez.jpg',
        'https://www.example.com/doctors/luna-martinez'
    ),
    (
        'Dr. Samuel Wright',
        'Plastic Surgeon',
        'male',
        20,
        '789 Oak Street, Detroit',
        '5551234567',
        'https://example.com/doctor-samuel-wright.jpg',
        'https://www.example.com/doctors/samuel-wright'
    ),
    (
        'Dr. Riley Mitchell',
        'Psychiatrist',
        'female',
        14,
        '321 Elm Avenue, Baltimore',
        '1234567890',
        'https://example.com/doctor-riley-mitchell.jpg',
        'https://www.example.com/doctors/riley-mitchell'
    ),
    (
        'Dr. Leo Hughes',
        'Ophthalmologist',
        'male',
        17,
        '789 Oak Street, Seattle',
        '5559876543',
        'https://example.com/doctor-leo-hughes.jpg',
        'https://www.example.com/doctors/leo-hughes'
    ),
    (
        'Dr. Stella Brooks',
        'Dermatologist',
        'female',
        11,
        '456 Pine Lane, Houston',
        '9876543210',
        'https://example.com/doctor-stella-brooks.jpg',
        'https://www.example.com/doctors/stella-brooks'
    ),
    (
        'Dr. Nathan Turner',
        'ENT Specialist',
        'male',
        16,
        '567 Cedar Avenue, Miami',
        '5551234567',
        'https://example.com/doctor-nathan-turner.jpg',
        'https://www.example.com/doctors/nathan-turner'
    ),
    (
        'Dr. Bella Evans',
        'Gynecologist',
        'female',
        13,
        '789 Oak Street, Atlanta',
        '1234567890',
        'https://example.com/doctor-bella-evans.jpg',
        'https://www.example.com/doctors/bella-evans'
    ),
    (
        'Dr. Isaac Martinez',
        'Endocrinologist',
        'male',
        8,
        '234 Pine Lane, Dallas',
        '5551234567',
        'https://example.com/doctor-isaac-martinez.jpg',
        'https://www.example.com/doctors/isaac-martinez'
    ),
    (
        'Dr. Violet Anderson',
        'Orthopedic Surgeon',
        'female',
        20,
        '567 Cedar Avenue, Phoenix',
        '5559876543',
        'https://example.com/doctor-violet-anderson.jpg',
        'https://www.example.com/doctors/violet-anderson'
    ),
    (
        'Dr. Elijah Wilson',
        'Rheumatologist',
        'male',
        9,
        '789 Oak Street, Denver',
        '1234567890',
        'https://example.com/doctor-elijah-wilson.jpg',
        'https://www.example.com/doctors/elijah-wilson'
    ),
    (
        'Dr. Aurora Thompson',
        'Dentist',
        'female',
        15,
        '321 Elm Avenue, Austin',
        '5559876543',
        'https://example.com/doctor-aurora-thompson.jpg',
        'https://www.example.com/doctors/aurora-thompson'
    ),
    (
        'Dr. Eli Collins',
        'Orthodontist',
        'male',
        19,
        '789 Oak Street, San Diego',
        '1234567890',
        'https://example.com/doctor-eli-collins.jpg',
        'https://www.example.com/doctors/eli-collins'
    ),
    (
        'Dr. Nora Walker',
        'Dermatologist',
        'female',
        16,
        '456 Pine Lane, Nashville',
        '5559876543',
        'https://example.com/doctor-nora-walker.jpg',
        'https://www.example.com/doctors/nora-walker'
    ),
    (
        'Dr. Luke Evans',
        'Gastroenterologist',
        'male',
        14,
        '789 Oak Street, Portland',
        '1234567890',
        'https://example.com/doctor-luke-evans.jpg',
        'https://www.example.com/doctors/luke-evans'
    ),
    (
        'Dr. Grace Cooper',
        'Psychologist',
        'female',
        10,
        '234 Pine Lane, Las Vegas',
        '5559876543',
        'https://example.com/doctor-grace-cooper.jpg',
        'https://www.example.com/doctors/grace-cooper'
    ),
    (
        'Dr. Oliver Turner',
        'Urologist',
        'male',
        18,
        '567 Cedar Avenue, Charlotte',
        '1234567890',
        'https://example.com/doctor-oliver-turner.jpg',
        'https://www.example.com/doctors/oliver-turner'
    ),
    (
        'Dr. Hazel Rodriguez',
        'Oncologist',
        'female',
        12,
        '789 Oak Street, San Antonio',
        '5559876543',
        'https://example.com/doctor-hazel-rodriguez.jpg',
        'https://www.example.com/doctors/hazel-rodriguez'
    ),
    (
        'Dr. Henry Collins',
        'Neurosurgeon',
        'male',
        9,
        '234 Pine Lane, Philadelphia',
        '1234567890',
        'https://example.com/doctor-henry-collins.jpg',
        'https://www.example.com/doctors/henry-collins'
    ),
    (
        'Dr. Luna Martinez',
        'Dentist',
        'female',
        15,
        '567 Cedar Avenue, Minneapolis',
        '5559876543',
        'https://example.com/doctor-luna-martinez.jpg',
        'https://www.example.com/doctors/luna-martinez'
    ),
    (
        'Dr. Samuel Wright',
        'Plastic Surgeon',
        'male',
        20,
        '789 Oak Street, Detroit',
        '1234567890',
        'https://example.com/doctor-samuel-wright.jpg',
        'https://www.example.com/doctors/samuel-wright'
    )
    ]

    with connection.cursor() as cursor:
        cursor.executemany(query, values)

        return render(request, 'index.html')
