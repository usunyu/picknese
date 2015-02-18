from django.conf.urls import patterns, include, url
from userprofile.views import CurrentUserView, UserDetail, ExampleView

urlpatterns = patterns('',
	url(r'^profile/$', 'userprofile.views.user_profile'),
	url(r'^api/me/$', CurrentUserView.as_view()),
	url(r'^api/(?P<pk>\d+)/$', UserDetail.as_view()),
	url(r'^api/exampleview/$', ExampleView.as_view()),
)
