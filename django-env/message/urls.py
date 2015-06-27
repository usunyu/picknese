from django.conf.urls import patterns, include, url
from message import apis

urlpatterns = patterns('',
    # api
    url(r'^api/list/$', apis.MessageList.as_view()),
)
