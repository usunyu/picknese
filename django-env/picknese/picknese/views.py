from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.core.context_processors import csrf
from forms import PickneseSignUpForm

def index(request):
	return render(request, 'index.html')

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
		return HttpResponseRedirect('/')
	else:
		return HttpResponseRedirect('/accounts/login')

def logout(request):
	auth.logout(request)
	return HttpResponseRedirect('/')

def signup(request):
	if request.method == 'POST':
		form = PickneseSignUpForm(request.POST)
		if form.is_valid():
			form.save()
			return HttpResponseRedirect('/')

	context = {}
	context.update(csrf(request))
	context['form'] = PickneseSignUpForm()
	return render(request, 'signup.html', context)