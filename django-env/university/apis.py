from rest_framework import generics
from university.models import University
from university.serializers import UniversitySerializer

class UniversityList(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityDetail(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer