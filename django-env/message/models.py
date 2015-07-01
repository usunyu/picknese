from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    """
    Message Model
    Message for user contact each other
    """
    sender = models.ForeignKey(User, related_name='message_sender')
    receiver = models.ForeignKey(User, related_name='message_receiver')
    message = models.TextField()
    # unread = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Message from Sender: %s to Receiver: %s' % (self.sender.username, self.receiver.username)

class MessageReply(models.Model):
    """
    MessageReply Model
    Reply message for user to reply contact message
    """
    message_target = models.ForeignKey(Message)
    sender = models.ForeignKey(User, related_name='messagereply_sender')
    receiver = models.ForeignKey(User, related_name='messagereply_receiver')
    message = models.TextField()
    # unread = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Reply to %s' % (self.message_target)

class MessageUnread(models.Model):
    """
    MessageUnread Model
    Check if the user read the updated message
    """
    message_target = models.ForeignKey(Message)
    reader = models.ForeignKey(User)

    def __str__(self):  # __unicode__ on Python 2
        return "%s didn't read %s" % (self.reader, self.message_target)