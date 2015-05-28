from django.conf.urls import patterns, include, url
from pickup import views, apis

urlpatterns = patterns('',
    # Flight Pick Request Read API
    url(r'^api/flight/(?P<university_id>\d+)/$', apis.FlightPickRequestList.as_view()),
    # Flight Pick Request Create API
    url(r'^api/flight/create/$', apis.FlightPickRequestCreate.as_view()),
    # Flight Pick Request Mutate API
    url(r'^api/flight/mutate/(?P<pk>\d+)/$', apis.FlightPickRequestMutate.as_view()),
    # Normal Pick Request Read API
    url(r'^api/pick/(?P<university_id>\d+)/$', apis.PickRequestList.as_view()),
    # Normal Pick Request Create API
    url(r'^api/pick/create/$', apis.PickRequestCreate.as_view()),
    # Normal Pick Request Mutate API
    url(r'^api/pick/mutate/(?P<pk>\d+)/$', apis.PickRequestMutate.as_view()),
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
    #                               Legacy Code                                     #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
    # Requester
    url(r'^requesters/(?P<university_id>\d+)/$', views.pick_requester_list),
    url(r'^api/requesters/(?P<university_id>\d+)/$', apis.PickRequesterList.as_view()),
    url(r'^api/requesters/create/$', apis.PickRequesterCreate.as_view()),
    url(r'^api/requesters/mutate/(?P<pk>\d+)/$', apis.PickRequesterMutate.as_view()),
    # Pick Up
    url(r'^api/(?P<university_id>\d+)/$', apis.PickUpList.as_view()),
    url(r'^api/create/$', apis.PickUpCreate.as_view()),
    url(r'^api/mutate/(?P<pk>\d+)/$', apis.PickUpMutate.as_view()),
    # My Pick Up & Request
    url(r'^mylist/(?P<university_id>\d+)/$', views.pickup_my_list),
    url(r'^api/mylist/(?P<university_id>\d+)/$', apis.MyPickUpList.as_view()),
    url(r'^api/mylist/all/$', apis.MyAllPickUpList.as_view()),
    url(r'^api/requesters/mylist/(?P<university_id>\d+)/$', apis.MyPickRequestList.as_view()),
    url(r'^api/requesters/mylist/all/$', apis.MyAllPickRequestList.as_view()),
    url(r'^api/mylist/count/(?P<university_id>\d+)/$', apis.MyPickUpRequestCount.as_view()),
    url(r'^api/mylist/count/all/$', apis.MyAllPickUpRequestCount.as_view()),
)
