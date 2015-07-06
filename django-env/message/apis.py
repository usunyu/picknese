from django.db.models import Q

from rest_framework import permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from message.models import Message, MessageReply, MessageUnread

from message.serializers import MessageMutateSerializer
from userprofile.serializers import UserSerializer

RECEIVED_MESSAGE            = 1;
SENT_MESSAGE                = 2;

class MessageList(APIView):
    """
    MessageList APIView\n
    Retrieve Message based on Request User\n
    message/api/list/ => MessageList.as_view()
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, message_type, format=None):
        user = request.user
        message_type = int(message_type)
        # retrieve all the messages the user send or receive
        result = []

        unread_messages = MessageUnread.objects.filter(reader=user)
        unread_message_set = set()
        for unread_message in unread_messages:
            unread_message_set.add(unread_message.message_target.id)

        messages = [];
        if message_type == RECEIVED_MESSAGE:
            messages = Message.objects.filter(receiver=user).order_by('-created')
        if message_type == SENT_MESSAGE:
            messages = Message.objects.filter(sender=user).order_by('-created')

        for message in messages:
            sender_serializer = UserSerializer(message.sender)
            receiver_serializer = UserSerializer(message.receiver)
            unread = message.id in unread_message_set;
            result.append({
                'id'        : message.id,
                'sender'    : sender_serializer.data,
                'receiver'  : receiver_serializer.data,
                'message'   : message.message,
                'unread'    : unread,
                'created'   : message.created,
            })

        return Response(result, status=status.HTTP_200_OK)

class MessageReplyList(APIView):
    """
    MessageReplyList APIView\n
    Retrieve Message Reply based on Message\n
    message/api/replylist/1/ => MessageReplyList.as_view() 
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, message_id, format=None):
        result = []

        replies = MessageReply.objects.filter(message_target_id=message_id).order_by('-created')
        for reply in replies:
            # TODO: this can be optimized, sender & receiver always those two guys
            sender_serializer = UserSerializer(reply.sender)
            receiver_serializer = UserSerializer(reply.receiver)
            result.append({
                'id'        : reply.id,
                'sender'    : sender_serializer.data,
                'receiver'  : receiver_serializer.data,
                'message'   : reply.message,
                'created'   : reply.created,
            })

        return Response(result, status=status.HTTP_200_OK)

class MessageCreate(generics.CreateAPIView):
    """
    Create Message
    MessageCreate.as_view() => message/api/create/
    """
    serializer_class = MessageMutateSerializer
    permission_classes = (permissions.IsAuthenticated,)