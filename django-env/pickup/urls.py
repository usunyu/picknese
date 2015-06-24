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
    #                             PickUp (Carpool)                                  #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    url(r'^api/pickup/(?P<pk>\d+)/$', apis.PickUpList.as_view()),
    url(r'^api/pickup/create/$', apis.PickUpCreate.as_view()),
    url(r'^api/pickup/mutate/(?P<pk>\d+)/$', apis.PickUpMutate.as_view()),
)
