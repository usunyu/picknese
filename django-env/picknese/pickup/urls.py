from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^home/(?P<university_id>\d+)/$', 'pickup.views.index'),
	url(r'^provider/(?P<university_id>\d+)/$', 'pickup.views.provide_pick_provider'),
	url(r'^cancel_provider/(?P<university_id>\d+)/$', 'pickup.views.cancel_pick_provider'),
)
