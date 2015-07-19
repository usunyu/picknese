from django.contrib import admin
from message.models import Message, MessageReply, MessageReceive, MessageUnread

admin.site.register(Message)
admin.site.register(MessageReply)
admin.site.register(MessageReceive)
admin.site.register(MessageUnread)