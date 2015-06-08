from django.conf.urls import patterns, include, url
from userprofile import apis, views

urlpatterns = patterns('',
    # url
    url(r'^me/$', views.me),
    # api
    url(r'^api/request/(?P<user_id>\d+)/(?P<feed_type>\d+)/$', apis.ProfileRequestList.as_view()),
    url(r'^api/offer/(?P<user_id>\d+)/(?P<feed_type>\d+)/$', apis.ProfileOfferList.as_view()),
    # upload image
    url(r'^api/uploadimage/$', apis.ProfileImageUploadView.as_view()),

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
    #                               Legacy Code                                     #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
    url(r'^profile/$', views.user_profile),
    url(r'^myprofile/$', views.my_profile),

    url(r'^api/myprofile/$', apis.MyProfileDetail.as_view()),
    url(r'^api/me/$', apis.CurrentUserView.as_view()),
    url(r'^api/(?P<pk>\d+)/$', apis.UserDetail.as_view()),

    # User to University info
    # url(r'^api/touniversity/create/(?P<university_id>\d+)/$', apis.UserToUniversityCreate.as_view()),
)
