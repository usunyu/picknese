from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    """
    Message Model
    Message for user contact each other
    """
    sender = models.ForeignKey(User)
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Message from sender %s' % (self.sender.username)

class MessageReceive(models.Model):
    """
    MessageReceive Model
    Indicate what user receive the message
    """
    receiver = models.ForeignKey(User)
    message_target = models.ForeignKey(Message)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return '%s receive message %s' % (self.receiver.username, self.message_target.id)

class MessageReply(models.Model):
    """
    MessageReply Model
    Reply message for user to reply contact message
    """
    message_target = models.ForeignKey(Message)
    sender = models.ForeignKey(User)
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return '%s reply to message %s' % (self.sender.username, self.message_target.id)

class MessageUnread(models.Model):
    """
    MessageUnread Model
    Check if the user read the updated message
    """
    message_target = models.ForeignKey(Message)
    reader = models.ForeignKey(User)

    def __str__(self):  # __unicode__ on Python 2
        return "%s didn't read message %s" % (self.reader, self.message_target.id)