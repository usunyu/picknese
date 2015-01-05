from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from university.models import University
from pickup.models import PickProvider
from forms import PickProviderForm


def request_pickup(request, picker_id, pickee_id):
	pass

"""
show PickProvider
pickup.views.pick_provider_list university_id => pickup/provider/1/
"""
def pick_provider_list(request, university_id):
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
		'current_user': user,
		'is_provided': is_provided,
	}
	return render(request, 'pick_provider_list.html', context)

"""
create PickProvider
pickup.views.provide_pick_provider => pickup/provider/create/
"""
def provide_pick_provider(request):
	user = request.user
	if request.POST:
		form = PickProviderForm(request.POST)
		if form.is_valid():
			try:
				university = form.cleaned_data['university']
				pick_provider = form.save(commit=False)
				pick_provider.picker = user
				pick_provider.save()
				return HttpResponseRedirect('/pickup/provider/' + str(university.id))
			except:
				# TODO: show error message
				university = form.cleaned_data['university']
				return HttpResponseRedirect('/pickup/provider/' + str(university.id))
	else:
		form = PickProviderForm()

	context = {}
	context.update(csrf(request))
	context['form'] = form
	return render(request, 'provide_pick_provider.html', context)

"""
delete PickProvider from provider list view
pickup.views.cancel_pick_provider university_id => pickup/provider/delete/1
"""
def cancel_pick_provider(request, university_id):
	user = request.user
	university = get_object_or_404(University, id=university_id)
	PickProvider.objects.filter(picker=user.id, university_id=university.id).delete()
	return HttpResponseRedirect('/pickup/provider/' + university_id)
