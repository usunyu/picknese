from rest_framework.serializers import ModelSerializer

from message.models import Message, MessageReply

class MessageMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for Message
    Flat Serializer
    """
    class Meta:
        model = Message

class MessageReplyMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for MessageReply
    Flat Serializer
    """
    class Meta:
        model = MessageReply