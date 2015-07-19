from django.db.models import Q

from rest_framework import permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from message.models import Message, MessageReceive, MessageReply, MessageUnread

from message.serializers import MessageMutateSerializer
from userprofile.serializers import UserSerializer

RECEIVED_MESSAGE            = 1;
SENT_MESSAGE                = 2;

class MessageList(APIView):
    """
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
            message_receives = MessageReceive.objects.filter(receiver=user).order_by('-created')
            for receive in message_receives:
                messages.append(receive.message_target)
        if message_type == SENT_MESSAGE:
            messages = Message.objects.filter(sender=user).order_by('-created')

        for message in messages:
            sender_serializer = UserSerializer(message.sender)
            unread = message.id in unread_message_set
            result.append({
                'id'        : message.id,
                'sender'    : sender_serializer.data,
                'message'   : message.message,
                'unread'    : unread,
                'created'   : message.created,
            })

        return Response(result, status=status.HTTP_200_OK)

class MessageReplyList(APIView):
    """
    Retrieve Message Reply based on Message\n
    message/api/replylist/1/ => MessageReplyList.as_view() 
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, message_id, format=None):
        result = []

        replies = MessageReply.objects.filter(message_target_id=message_id).order_by('-created')
        for reply in replies:
            sender_serializer = UserSerializer(reply.sender)
            result.append({
                'id'        : reply.id,
                'sender'    : sender_serializer.data,
                'message'   : reply.message,
                'created'   : reply.created,
            })

        return Response(result, status=status.HTTP_200_OK)

class MessageCreate(APIView):
    """
    Create Message\n
    message/api/create/ => MessageCreate.as_view()
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        receiver = request.data['receiver']
        serializer = MessageMutateSerializer(data=request.data)
        # create Message
        if serializer.is_valid():
            message = serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # create MessageReceive
        receive = MessageReceive(message_target=message, receiver_id=receiver)
        receive.save()
        # create MessageUnread
        unread = MessageUnread(message_target=message, reader_id=receiver)
        unread.save()

        return Response({}, status=status.HTTP_201_CREATED)

class MessageReplyMutate():
    """
    Create MessageReply\n
    message/api/reply/create/ => MessageReplyCreate.as_view()
    """
    serializer_class = MessageMutateSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # def perform_create(self, serializer):
    #     message = serializer.save()
    #     # create MessageUnread
    #     unread = MessageUnread(message_target=message, reader=message.receiver)
    #     unread.save()

class MessageUnreadDelete(APIView):
    """
    Indicate the message has been read\n
    message/api/unread/1/ => MessageUnreadDelete.as_view()
    """
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, message_id, format=None):
        user = request.user
        unreads = MessageUnread.objects.filter(message_target_id=message_id, reader=user)
        if len(unreads) == 0:
            # this should not happen
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        unread = unreads[0]
        unread.delete()
        return Response({}, status=status.HTTP_200_OK)
