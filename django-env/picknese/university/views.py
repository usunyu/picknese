from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from university.models import University

# Show University
# university.views.university => universities/1
def university(request, university_id):
	university = get_object_or_404(University, pk=university_id)
	context = {'university': university}
	return render(request, 'university.html', context)