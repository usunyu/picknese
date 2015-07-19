from django.conf.urls import patterns, include, url
from message import apis

urlpatterns = patterns('',
    url(r'^api/list/(?P<message_type>\d+)/$', apis.MessageList.as_view()),
    url(r'^api/create/$', apis.MessageCreate.as_view()),
    url(r'^api/reply/create/$', apis.MessageReplyCreate.as_view()),
    url(r'^api/reply/list/(?P<message_id>\d+)/$', apis.MessageReplyList.as_view()),
    url(r'^api/read/(?P<message_id>\d+)/$', apis.MessageUnreadDelete.as_view()),
)
