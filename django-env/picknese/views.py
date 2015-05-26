from django.shortcuts import render, get_object_or_404
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
    return render(request, 'picknese/index2.html', context)

def home(request, university_id):
    """
    Show feed list based on University
    picknese.views.home => home/1/
    """
    university = get_object_or_404(University, id=university_id)
    context = {
        'current_user': request.user,
        'university': university,
    }
    return render(request, 'picknese/home.html', context)

def post_request(request, university_id):
    """
    Post new request
    picknese.views.post_request => home/1/new/
    """
    context = {
        'current_user': request.user,
        'university_id': university_id,
    }
    return render(request, 'picknese/post_request.html', context)

def login(request):
    context = {}
    context.update(csrf(request))
    return render(request, 'picknese/login.html', context)

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
    return render(request, 'picknese/signup.html', context)