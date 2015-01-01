from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.core.context_processors import csrf

from university.models import University
from forms import PickneseCreationForm

def index(request):
	universities = University.objects.all()
	context = {'universities': universities}
	return render(request, 'index.html', context)

def home(request, university_id):
	university = University.objects.get(id=university_id)
	context = {'university': university}
	return render(request, 'home.html', context)

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
		form = PickneseCreationForm(request.POST)
		if form.is_valid():
			form.save()
			return HttpResponseRedirect('/')

	context = {}
	context.update(csrf(request))
	context['form'] = PickneseCreationForm()
	return render(request, 'signup.html', context)