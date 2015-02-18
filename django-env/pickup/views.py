from django.shortcuts import render, get_object_or_404
from university.models import University

"""
Show My Pick Up List
pickup.views.pick_my_list => pickup/mylist/1/
"""
def pick_my_list(request, university_id):
    university = get_object_or_404(University, id=university_id)
    return render(request, 'pick_my_list.html', {})

"""
Show PickRequester List
pickup.views.pick_requester_list => pickup/requesters/1/
"""
def pick_requester_list(request, university_id):
    university = get_object_or_404(University, id=university_id)
    return render(request, 'pick_requester_list.html', {})
