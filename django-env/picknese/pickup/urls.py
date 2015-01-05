from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^home/(?P<university_id>\d+)/$', 'pickup.views.pickup'),
	url(r'^provider/create/$', 'pickup.views.provide_pick_provider'),
	url(r'^provider/delete/(?P<university_id>\d+)/$', 'pickup.views.cancel_pick_provider'),
)
