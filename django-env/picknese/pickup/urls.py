from django.conf.urls import patterns, include, url
from pickup.views import (PickRequesterList, PickRequesterMutate, 
                          PickUpList, PickUpCreate, PickUpMutate)

urlpatterns = patterns('',
    # Requester
    url(r'^requesters/(?P<university_id>\d+)/$', 'pickup.views.pick_requester_list'),
    url(r'^api/requesters/(?P<university_id>\d+)/$', PickRequesterList.as_view()),
    url(r'^api/requesters/mutate/(?P<pk>\d+)/$', PickRequesterMutate.as_view()),
    # Legacy Requester
    url(r'^api/requesters/create/(?P<pk>\d+)/$', 'pickup.views.create_pick_requester'),
    # Provider
    url(r'^provider/create/$', 'pickup.views.provide_pick_provider'),
    url(r'^provider/create/(?P<university_id>\d+)/$', 'pickup.views.provide_pick_provider'),
    url(r'^provider/delete/(?P<university_id>\d+)/$', 'pickup.views.cancel_pick_provider'),
    # Pick Up
    url(r'^create/(?P<request_id>\d+)/$', 'pickup.views.create_pickup'),
    url(r'^api/(?P<university_id>\d+)/$', PickUpList.as_view()),
    url(r'^api/create/$', PickUpCreate.as_view()),
    url(r'^api/mutate/(?P<pk>\d+)/$', PickUpMutate.as_view()),
)
