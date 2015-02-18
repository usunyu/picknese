from django.conf.urls import patterns, include, url
from pickup import views

urlpatterns = patterns('',
    # Requester
    url(r'^requesters/(?P<university_id>\d+)/$', views.pick_requester_list),
    url(r'^api/requesters/(?P<university_id>\d+)/$', views.PickRequesterList.as_view()),
    url(r'^api/requesters/create/$', views.PickRequesterCreate.as_view()),
    url(r'^api/requesters/mutate/(?P<pk>\d+)/$', views.PickRequesterMutate.as_view()),
    # Legacy Requester
    url(r'^api/requesters/create/(?P<pk>\d+)/$', 'pickup.views.create_pick_requester'),
    # Pick Up
    url(r'^api/(?P<university_id>\d+)/$', views.PickUpList.as_view()),
    url(r'^api/create/$', views.PickUpCreate.as_view()),
    url(r'^api/mutate/(?P<pk>\d+)/$', views.PickUpMutate.as_view()),
    # Legacy Pick Up
    url(r'^create/(?P<request_id>\d+)/$', 'pickup.views.create_pickup'),
    # My Pick Up List
    url(r'^mylist/(?P<university_id>\d+)/$', views.PickRequesterMutate.as_view()),
)
