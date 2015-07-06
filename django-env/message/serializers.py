from rest_framework.serializers import ModelSerializer

from message.models import Message, MessageReply, MessageUnread

class MessageMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for Message
    Flat Serializer
    """
    class Meta:
        model = Message