from django.conf.urls import patterns, include, url
from pickup import views, apis

urlpatterns = patterns('',
    # Requester
    url(r'^requesters/(?P<university_id>\d+)/$', views.pick_requester_list),
    url(r'^api/requesters/(?P<university_id>\d+)/$', apis.PickRequesterList.as_view()),
    url(r'^api/requesters/create/$', apis.PickRequesterCreate.as_view()),
    url(r'^api/requesters/mutate/(?P<pk>\d+)/$', apis.PickRequesterMutate.as_view()),
    # Pick Up
    url(r'^api/(?P<university_id>\d+)/$', apis.PickUpList.as_view()),
    url(r'^api/create/$', apis.PickUpCreate.as_view()),
    url(r'^api/mutate/(?P<pk>\d+)/$', apis.PickUpMutate.as_view()),
    # My Pick Up List
    url(r'^mylist/(?P<university_id>\d+)/$', views.pick_my_list),
)
