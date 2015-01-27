from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework import generics

from pickup.forms import PickRequesterForm
from university.models import University
from university.serializers import UniversitySerializer

"""
Show University
university.views.university => universities/1
"""
def university(request, university_id):
    user = request.user
    university = get_object_or_404(University, pk=university_id)
    requester_form = PickRequesterForm(
        initial = {
            'requester': user.id,
            'university': university_id,
        }
    )

    context = {
        'university': university,
        'requester_form': requester_form,
    }
    return render(request, 'university.html', context)

def university_list(request):
    return render(request, 'university_list.html', {})

class UniversityList(generics.ListCreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityDetail(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
