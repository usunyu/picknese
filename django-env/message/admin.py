from django.contrib import admin
from message.models import Message, MessageReply, MessageUnread

admin.site.register(Message)
admin.site.register(MessageReply)
admin.site.register(MessageUnread)