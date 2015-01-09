from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^providers/(?P<university_id>\d+)/$', 'pickup.views.pick_provider_list'),
	url(r'^requesters/(?P<university_id>\d+)/$', 'pickup.views.pick_requester_list'),
	url(r'^provider/create/$', 'pickup.views.provide_pick_provider'),
	url(r'^provider/delete/(?P<university_id>\d+)/$', 'pickup.views.cancel_pick_provider'),
	url(r'^create/(?P<university_id>\d+)/$', 'pickup.views.request_pickup'),
)
