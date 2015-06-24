from django.contrib import admin
from message.models import Message, MessageReply

admin.site.register(Message)
admin.site.register(MessageReply)