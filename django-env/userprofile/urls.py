from django.conf.urls import patterns, include, url
from userprofile import apis, views

urlpatterns = patterns('',
	url(r'^profile/$', views.user_profile),
	url(r'^myprofile/$', views.my_profile),
	url(r'^api/myprofile/$', apis.MyProfileDetail.as_view()),
	url(r'^api/me/$', apis.CurrentUserView.as_view()),
	url(r'^api/(?P<pk>\d+)/$', apis.UserDetail.as_view()),
)
