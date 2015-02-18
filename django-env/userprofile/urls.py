from django.conf.urls import patterns, include, url
from userprofile import apis

urlpatterns = patterns('',
	url(r'^profile/$', 'userprofile.views.user_profile'),
	url(r'^api/me/$', apis.CurrentUserView.as_view()),
	url(r'^api/(?P<pk>\d+)/$', apis.UserDetail.as_view()),
)
