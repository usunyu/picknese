from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework import generics, permissions

from university.models import University
from pickup.models import PickProvider, PickRequester, PickUp
from forms import PickProviderForm, PickRequesterForm, PickUpForm
from pickup.serializers import PickRequesterSerializer

# PickProvider message
CREATE_PICK_PROVIDER_SUCCESS_MESSAGE = 'Congratulation! You successful register as pick up provider, we will inform you when someone need help.'
CREATE_PICK_PROVIDER_ERROR_MESSAGE = 'Sorry! Register pick up provider failed, please try again later.'
# PickRequester message
CREATE_PICK_REQUESTER_SUCCESS_MESSAGE = 'Congratulation! You successful post your request, we will inform you if someone help you.'
CREATE_PICK_REQUESTER_ERROR_MESSAGE = 'Sorry! Post your request failed, please try again later.'
# PickUp message
CREATE_PICK_UP_SUCCESS_MESSAGE = 'Thank you so much for your help!'
CREATE_PICK_UP_ERROR_MESSAGE = 'Sorry! Offer your help failed, please try again later.'

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
				messages.success(request, CREATE_PICK_UP_SUCCESS_MESSAGE)
				return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university.id,)))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				pass
	messages.error(request, CREATE_PICK_UP_ERROR_MESSAGE)
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
				print form
				form.save()
				# pick_requester.university = university
				# pick_requester.requester = user
				# pick_requester.save()
				messages.success(request, CREATE_PICK_REQUESTER_SUCCESS_MESSAGE)
				return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university_id,)))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				pass
	messages.error(request, CREATE_PICK_REQUESTER_ERROR_MESSAGE)
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
	requester_form = PickRequesterForm(
		initial = {
			'requester': user.id,
			'university': university_id,
		}
	)
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
	return render(request, 'pick_requester_list.html', context)

"""
API PickRequesterList ListCreateAPIView
Retrieve or Create pick requesters based on University ID
PickRequesterList.as_view() => pickup/requesters/api/1/
"""
class PickRequesterList(generics.ListCreateAPIView):
    serializer_class = PickRequesterSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return PickRequester.objects.filter(university=university_id)

"""
Test for React
pickup.views.pick_requester_list => pickup/requesters/1/
"""
def pick_requester_list2(request, university_id):
    return render(request, 'pick_requester_list2.html', {})

"""
create PickProvider
pickup.views.provide_pick_provider university_id => pickup/provider/create/1
"""
@login_required
def provide_pick_provider(request, university_id=0):
	user = request.user
	if request.POST:
		form = PickProviderForm(request.POST)
		if form.is_valid():
			university = form.cleaned_data['university']
			try:
				pick_provider = form.save(commit=False)
				pick_provider.picker = user
				pick_provider.save()
				messages.success(request, CREATE_PICK_PROVIDER_SUCCESS_MESSAGE)
				return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university.id,)))
			except Exception as e:
				# TODO: logging
				# print '%s (%s)' % (e.message, type(e))
				messages.error(request, CREATE_PICK_PROVIDER_ERROR_MESSAGE)
				return HttpResponseRedirect(reverse('pickup.views.pick_requester_list', args=(university.id,)))
	elif university_id:
		form = PickProviderForm(initial={'university': university_id})
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



