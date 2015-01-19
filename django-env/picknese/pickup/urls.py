from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	# Requester
	url(r'^requesters/(?P<university_id>\d+)/$', 'pickup.views.pick_requester_list'),
	url(r'^requester/create/(?P<university_id>\d+)/$', 'pickup.views.create_pick_requester'),
	# Provider
	url(r'^provider/create/$', 'pickup.views.provide_pick_provider'),
	url(r'^provider/create/(?P<university_id>\d+)/$', 'pickup.views.provide_pick_provider'),
	url(r'^provider/delete/(?P<university_id>\d+)/$', 'pickup.views.cancel_pick_provider'),
	# Pick Up
	url(r'^create/(?P<request_id>\d+)/$', 'pickup.views.create_pickup'),
)
