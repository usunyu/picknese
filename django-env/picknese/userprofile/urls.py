from django.conf.urls import patterns, include, url
from userprofile.views import CurrentUserView

urlpatterns = patterns('',
	url(r'^profile/$', 'userprofile.views.user_profile'),
	url(r'^api/me/$', CurrentUserView.as_view()),
)
