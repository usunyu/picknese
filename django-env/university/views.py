from django.shortcuts import render

"""
Show University
university.views.university => universities/1
"""
def university(request, university_id):
    return render(request, 'university.html', {})

"""
Demo University Page
"""
def university_list(request):
    return render(request, 'university_list.html', {})
