from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from university.models import University
from pickup.models import PickProvider, PickRequester, PickUp
from forms import PickProviderForm, PickRequesterForm, PickUpForm

"""
create PickUp
pickup.views.create_pickup request_id => pickup/create/1
"""
@login_required
def create_pickup(request, request_id):
	pickup_request = get_object_or_404(PickRequester, id=request_id)
	if request.POST:
		form = PickUpForm(request.POST)
		if form.is_valid():
			university = form.cleaned_data['university']
			try:
				form.save()
				pickup_request.confirmed = True
				pickup_request.save()
				# TODO: show success message
				return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university.id,)))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				pass
	# TODO: show error message
	return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university.id,)))

"""
create PickRequester
pickup.views.create_pick_requester university_id => pickup/requester/create/1
"""
def create_pick_requester(request, university_id):
	user = request.user
	university = get_object_or_404(University, id=university_id)
	if request.POST:
		form = PickRequesterForm(request.POST)
		if form.is_valid():
			try:
				pick_requester = form.save(commit=False)
				pick_requester.university = university
				pick_requester.requester = user
				pick_requester.save()
				# TODO: show success message
				return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university_id,)))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				pass
	# TODO: show error message
	return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university_id,)))

"""
class to assemble the data pass to template
"""
class RequesterInfo(object):

	def __init__(self, pick_requester, form):
		self.pick_requester = pick_requester
		self.form = form

"""
show PickRequester
pickup.views.pick_requester_list => pickup/requesters/1/
"""
def pick_requester_list(request, university_id):
	user = request.user
	university = get_object_or_404(University, id=university_id)
	requester_form = PickRequesterForm()
	pick_requesters = PickRequester.objects.filter(university=university, confirmed=False)
	pick_ups = PickUp.objects.filter(university=university)
	requester_info_list = []
	# create form for every requester
	for pick_requester in pick_requesters:
		form = PickUpForm(
			initial = {
				'picker': user.id,
				'pickee': pick_requester.requester.id,
				'university': university_id,
				'pick_type': pick_requester.pick_type,
				'flight': pick_requester.flight,
				'price': pick_requester.price,
				'destination': pick_requester.destination,
			}
		)
		requester_info = RequesterInfo(
			pick_requester,
			form,
		)
		requester_info_list.append(requester_info)

	context = {}
	context.update(csrf(request))
	context['university'] = university
	context['requester_form'] = requester_form
	context['requester_info_list'] = requester_info_list
	context['pick_ups'] = pick_ups
	context['requester_page'] = True
	return render(request, 'pick_requester_list.html', context)

"""
create PickProvider
pickup.views.provide_pick_provider university_id => pickup/provider/create/1
"""
@login_required
def provide_pick_provider(request, university_id=0):
	user = request.user
	# create pick up provider in requesters page
	if university_id:
		university = get_object_or_404(University, id=university_id)
		pick_provider = PickProvider(picker=user, university=university, listed=True)
		pick_provider.save()
		return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university_id,)))
	# create pick up provider in other page which has not associated university
	else:
		if request.POST:
			form = PickProviderForm(request.POST)
			if form.is_valid():
				university = form.cleaned_data['university']
				try:
					pick_provider = form.save(commit=False)
					pick_provider.picker = user
					pick_provider.save()
					return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university.id,)))
				except Exception as e:
					# TODO: logging
					# print '%s (%s)' % (e.message, type(e))
					# TODO: show error message
					return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university.id,)))
			else:
				print "Form is not valid"
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
	return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university_id,)))
