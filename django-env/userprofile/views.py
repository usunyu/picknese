import os
from PIL import Image as PImage

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.contrib.auth.decorators import login_required

from userprofile.forms import UserProfileForm

@login_required(login_url="/accounts/login/")
def user_profile(request):
	user = request.user
	profile = user.profile
	# TODO: delete avatar pic after user update
	if request.method == "POST":
		form = UserProfileForm(
			request.POST,
			request.FILES,
			instance=profile,
		)
		if form.is_valid():
			form.save()
			return HttpResponseRedirect('/accounts/profile/')
	else:
		form = UserProfileForm(instance=profile)

	context = {}
	context.update(csrf(request))
	context['form'] = form
	context['profile'] = profile
	return render(request, 'userprofile/profile.html', context)

"""
Show My UserProfile
userprofile.views.my_profile => accounts/myprofile/
"""
def my_profile(request):
    return render(request, 'userprofile/my_profile.html', {})