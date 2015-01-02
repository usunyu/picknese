from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^university/(?P<university_id>\d+)/$', 'pickup.views.index'),
)
