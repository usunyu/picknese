from django.conf.urls import patterns, include, url
from pickup import views, apis

urlpatterns = patterns('',
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                           FlightPickRequest                                   #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    url(r'^api/flight_request/(?P<university_id>\d+)/$', apis.FlightPickRequestList.as_view()),
    url(r'^api/flight_request/create/$', apis.FlightPickRequestCreate.as_view()),
    url(r'^api/flight_request/mutate/(?P<pk>\d+)/$', apis.FlightPickRequestMutate.as_view()),
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                              FlightPickUp                                     #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    url(r'^api/flight_pickup/(?P<pk>\d+)/$', apis.FlightPickUpList.as_view()),
    url(r'^api/flight_pickup/create/$', apis.FlightPickUpCreate.as_view()),
    url(r'^api/flight_pickup/mutate/(?P<pk>\d+)/$', apis.FlightPickUpMutate.as_view()),
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                               PickRequest                                     #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    url(r'^api/request/(?P<university_id>\d+)/$', apis.PickRequestList.as_view()),
    url(r'^api/request/create/$', apis.PickRequestCreate.as_view()),
    url(r'^api/request/mutate/(?P<pk>\d+)/$', apis.PickRequestMutate.as_view()),
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                                 PickUp                                        #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    url(r'^api/pickup/(?P<pk>\d+)/$', apis.PickUpList.as_view()),
    url(r'^api/pickup/create/$', apis.PickUpCreate.as_view()),
    url(r'^api/pickup/mutate/(?P<pk>\d+)/$', apis.PickUpMutate.as_view()),

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
