from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.core.context_processors import csrf

from django.contrib.auth.models import User
from university.models import University
from forms import PickneseCreationForm
from userprofile.models import UserProfile

def index(request):
	universities = University.objects.all()
	user_count = User.objects.count()
	context = {
		'universities': universities,
		'user_count': user_count,
	}
	return render(request, 'index2.html', context)

def login(request):
	context = {}
	context.update(csrf(request))
	return render(request, 'login.html', context)

def auth_view(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = auth.authenticate(username=username, password=password)

	if user is not None:
		auth.login(request, user)
		url = request.META['HTTP_REFERER']
		# manually parse the next page
		url_parts = url.split('next=')
		next_url = '/'
		if len(url_parts) == 2:
			next_url = url_parts[1]
		return HttpResponseRedirect(next_url)
	else:
		return HttpResponseRedirect('/accounts/login')

def logout(request):
	auth.logout(request)
	return HttpResponseRedirect('/')

def signup(request):
	if request.method == 'POST':
		form = PickneseCreationForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password2')
			user = auth.authenticate(username=username, password=password)
			# create user profile
			UserProfile.objects.get_or_create(user=user)
			auth.login(request, user)
			return HttpResponseRedirect('/')

	context = {}
	context.update(csrf(request))
	context['form'] = PickneseCreationForm()
	return render(request, 'signup.html', context)