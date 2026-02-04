from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import StudentModel
from .serializers import StudentSerializer

# Create your views here.

class StudentViewSet(ModelViewSet):
    queryset=StudentModel.objects.all()
    serializer_class=StudentSerializer

