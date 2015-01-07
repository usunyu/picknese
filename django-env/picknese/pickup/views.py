from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from university.models import University
from pickup.models import PickProvider
from forms import PickProviderForm, PickUpForm

"""
create PickUp
pickup.views.request_pickup university_id => provider/create/1/
"""
def request_pickup(request, university_id):
	print request.POST
	if request.POST:
		form = PickUpForm(request.POST)
		print form
		if form.is_valid():
			university = form.cleaned_data['university']
			try:
				pick_provider = form.save()
				# TODO: show success message
				return HttpResponseRedirect('/pickup/provider/' + str(university_id))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				pass
	# TODO: show error message
	return HttpResponseRedirect('/pickup/provider/' + str(university_id))

"""
show PickProvider
pickup.views.pick_provider_list university_id => pickup/provider/1/
"""
def pick_provider_list(request, university_id):
	user = request.user
	university = get_object_or_404(University, id=university_id)
	pick_providers = []
	forms = {}
	try:
		pick_providers = PickProvider.objects.filter(university=university)
		# mapping the form, TODO: AJAX gen form as needed
		for pick_provider in pick_providers:
			forms[pick_provider.picker.id] = PickUpForm(
				initial = {
					'picker': pick_provider.picker.id,
					'pickee': user.id,
					'university': university_id,
				}
			)
	except Exception as e:
		# TODO: logging
		# print '%s (%s)' % (e.message, type(e))
		pass

	context = {}
	context.update(csrf(request))
	context['university'] = university
	context['pick_providers'] = pick_providers
	context['current_user'] = user
	context['forms'] = forms
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
			university = form.cleaned_data['university']
			try:
				pick_provider = form.save(commit=False)
				pick_provider.picker = user
				pick_provider.save()
				return HttpResponseRedirect('/pickup/provider/' + str(university.id))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				# TODO: show error message
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
