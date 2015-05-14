from django.shortcuts import render, get_object_or_404
from university.models import University

def pickup_my_list(request, university_id):
    """
    Show My Pick Up List
    pickup.views.pickup_my_list => pickup/mylist/1/
    """
    university = get_object_or_404(University, id=university_id)
    return render(request, 'pickup/pickup_my_list.html', {})

def pick_requester_list(request, university_id):
    """
    Show PickRequester List
    pickup.views.pick_requester_list => pickup/requesters/1/
    """
    university = get_object_or_404(University, id=university_id)
    return render(request, 'pickup/pick_requester_list.html', {})
