from django.db import models

# Create your models here.

class StudentModel(models.Model):
    name=models.CharField(max_length=20)
    department=models.CharField(max_length=20)