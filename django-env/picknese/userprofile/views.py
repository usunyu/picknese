import os
from PIL import Image as PImage

# Django
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.contrib.auth.decorators import login_required

# REST Framework
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

# Provider OAuth2
from provider.oauth2.models import Client

# userprofile app
from userprofile.models import User
from userprofile.serializers import UserSerializer, RegistrationSerializer
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

class RegistrationView(APIView):
    """ Allow registration of new users. """
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegistrationSerializer(data=request.DATA)

        # Check format and unique constraint
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        data = serializer.data

        user = User.objects.create(username=data['username'])
        user.set_password(data['password'])
        user.save()

        # Create OAuth2 client
        name = user.username
        client = Client(user=user, name=name, url='' + name, client_id=name, client_secret='', client_type=1)
        client.save()
        return Response(serializer.data, status=HTTP_201_CREATED)

class CurrentUserView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ExampleView(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)
