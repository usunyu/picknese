from django.shortcuts import render, get_object_or_404
from university.models import University

"""
Show University
university.views.university => universities/1
"""
def university(request, university_id):
    university = get_object_or_404(University, id=university_id)
    return render(request, 'university/university.html', {})

"""
Demo University Page
"""
def university_list(request):
    return render(request, 'university/university_list.html', {})
