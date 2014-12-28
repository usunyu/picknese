from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from university.models import University
from forms import UniversityForm

# Create your views here.
def universities(request):
	universities = University.objects.all()
	context = {'universities': universities}
	return render(request, 'universities.html', context)

def university(request, university_id):
	university = get_object_or_404(University, pk=university_id)
	context = {'university': university}
	return render(request, 'university.html', context)

def create(request):
	if request.POST:
		form = UniversityForm(request.POST)
		if form.is_valid():
			form.save()
			return HttpResponseRedirect('/universities/')
	else:
		form = UniversityForm()

	context = {}
	context.update(csrf(request))
	context['form'] = form
	return render(request, 'create_university.html', context)

def edit(request):
	pass