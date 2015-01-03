from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from university.models import University
from pickup.models import PickProvider
from forms import PickProviderForm

# Create your views here.
def index(request, university_id):
	user = request.user
	university = get_object_or_404(University, id=university_id)
	pick_providers = []
	is_provided = False
	try:
		pick_providers = PickProvider.objects.filter(university=university)
		for pick_provider in pick_providers:
			if pick_provider.picker == user:
				is_provided = True
				break
	except:
		pick_providers = []

	context = {
		'university': university,
		'pick_providers': pick_providers,
		'is_provided': is_provided,
	}
	return render(request, 'pickup/index.html', context)

# create pick_provider
def provider(request, university_id):
	user = request.user
	university = get_object_or_404(University, id=university_id)
	if request.POST:
		form = PickProviderForm(request.POST)
		if form.is_valid():
			provider = form.save(commit=False)
			provider.picker = user
			provider.university = university
			provider.save()
			return HttpResponseRedirect('/pickup/home/' + university_id)
	else:
		form = PickProviderForm()

	context = {}
	context.update(csrf(request))
	context['form'] = form
	context['university'] = university
	return render(request, 'pickup/provider.html', context)
