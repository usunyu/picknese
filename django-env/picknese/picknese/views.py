from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.core.context_processors import csrf

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
		return HttpResponseRedirect('/home')
	else:
		return HttpResponseRedirect('/accounts/login')

def loggedin(request):
	context = {'full_name': request.user.username}
	return render(request, 'loggedin.html', context)

def logout(request):
	auth.logout(request)
	return HttpResponseRedirect('/home')