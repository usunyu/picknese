from django.shortcuts import render, get_object_or_404
from django.http import Http404

from rest_framework import generics

from university.models import University
from university.serializers import UniversitySerializer

"""
Show University
university.views.university => universities/1
"""
def university(request, university_id):
    return render(request, 'university.html', {})

def university_list(request):
    return render(request, 'university_list.html', {})

class UniversityList(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityDetail(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
