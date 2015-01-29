import os
from PIL import Image as PImage
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from userprofile.models import User
from userprofile.serializers import UserSerializer
from forms import UserProfileForm

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
	return render(request, 'profile.html', context)
	

class CurrentUserView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)