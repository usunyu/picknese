from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse

from university.models import University
from pickup.models import PickProvider, PickUp
from forms import PickProviderForm, PickUpForm

"""
create PickUp
pickup.views.request_pickup university_id => provider/create/1/
"""
def request_pickup(request, university_id):
	if request.POST:
		form = PickUpForm(request.POST)
		if form.is_valid():
			university = form.cleaned_data['university']
			try:
				pick_provider = form.save()
				# TODO: show success message
				return HttpResponseRedirect(reverse('pickup.views.pick_provider_list', args=(university_id,)))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				pass
	# TODO: show error message
	return HttpResponseRedirect(reverse('pickup.views.pick_provider_list', args=(university_id,)))

"""
class to assemble the data pass to template
"""
class ProviderInfo(object):

	def __init__(self, pick_provider, form, pickup):
		self.pick_provider = pick_provider
		self.form = form
		self.pickup = pickup

"""
show PickProvider
pickup.views.pick_provider_list university_id => pickup/providers/1/
"""
def pick_provider_list(request, university_id):
	user = request.user
	university = get_object_or_404(University, id=university_id)
	provider_info_list = []
	try:
		pick_providers = PickProvider.objects.filter(university=university)
		pickups = PickUp.objects.filter(pickee=user, university=university)
		pickup_dict = dict([ (pickup.picker.id, pickup) for pickup in pickups ])
		# mapping the form, TODO: AJAX gen form as needed
		for pick_provider in pick_providers:
			form = PickUpForm(
				initial = {
					'picker': pick_provider.picker.id,
					'pickee': user.id,
					'university': university_id,
				}
			)
			provider_info = ProviderInfo(
				pick_provider,
				form,
				pickup_dict.get(pick_provider.picker.id)
			)
			provider_info_list.append(provider_info)

	except Exception as e:
		# TODO: logging
		# print '%s (%s)' % (e.message, type(e))
		pass

	context = {}
	context.update(csrf(request))
	context['university'] = university
	context['provider_info_list'] = provider_info_list
	context['current_user'] = user
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
				return HttpResponseRedirect(reverse('pickup.views.pick_provider_list', args=(university_id,)))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				# TODO: show error message
				return HttpResponseRedirect(reverse('pickup.views.pick_provider_list', args=(university_id,)))
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
	return HttpResponseRedirect(reverse('pickup.views.pick_provider_list', args=(university_id,)))
