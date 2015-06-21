import itertools
from django.db.models import Q
from base64 import b64decode

from django.http import Http404
from django.core.files.base import ContentFile

from rest_framework import permissions, response, generics, views, status
# from rest_framework.parsers import FileUploadParser, JSONParser

from picknese import constants

from picknese.serializers import HomeFeedSerializer
from userprofile.models import User, UserProfile
from userprofile.serializers import (UserSerializer, 
                                     UserProfileSerializer,)

from pickup.models import FlightPickRequest, PickRequest, FlightPickUp, PickUp
from university.models import University

class ProfileInfoUpdateView(views.APIView):
    """
    ProfileInfoUpdateView APIView\n
    Update User Profile Information
    """
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        user = request.user

        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        profile = user.profile
        if request.data['university']:
            profile.university = University.objects.get(pk=request.data['university'])
        if request.data['birthday'] != "Invalid date":
            profile.birthday = request.data['birthday']
        if request.data['introduction']:
            profile.introduction = request.data['introduction']
        if request.data['gender']:
            profile.gender = request.data['gender']
        if request.data['phone']:
            profile.phone = request.data['phone']
        if request.data['qq']:
            profile.qq = request.data['qq']
        if request.data['wechat']:
            profile.wechat = request.data['wechat']

        profile.save()
        user.save()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

class ProfileRequestList(generics.ListAPIView):
    """
    ProfileRequestList ListAPIView\n
    Retrieve Requests based on User ID\n
    profile/api/request/1/ => ProfileRequestList.as_view() 
    """
    serializer_class = HomeFeedSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        feed_type = int(self.kwargs['feed_type'])

        if feed_type == constants.CONFIRMED_POST:
            return list(itertools.chain(
                FlightPickUp.objects.filter(requester=user_id),
                PickUp.objects.filter(requester=user_id),
            ))

        if feed_type == constants.UNCONFIRMED_POST:
            return list(itertools.chain(
                FlightPickRequest.objects.filter(Q(requester=user_id) & Q(confirmed=False)), 
                PickRequest.objects.filter(Q(requester=user_id) & Q(confirmed=False)), 
            ))

        if feed_type == constants.ALL_POST:
            return list(itertools.chain(
                FlightPickRequest.objects.filter(Q(requester=user_id) & Q(confirmed=False)),
                PickRequest.objects.filter(Q(requester=user_id) & Q(confirmed=False)),
                FlightPickUp.objects.filter(requester=user_id),
                PickUp.objects.filter(requester=user_id),
            ))

class ProfileOfferList(generics.ListAPIView):
    """
    ProfileOfferList ListAPIView\n
    Retrieve Offers based on User ID\n
    profile/api/offer/1/ => ProfileOfferList.as_view() 
    """
    serializer_class = HomeFeedSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        feed_type = int(self.kwargs['feed_type'])

        if feed_type == constants.PICK_UP:
            return PickUp.objects.filter(picker=user_id)

        if feed_type == constants.FLIGHT_PICK_UP:
            return FlightPickUp.objects.filter(picker=user_id)

        if feed_type == constants.ALL_POST:
            return list(itertools.chain(
                PickUp.objects.filter(picker=user_id),
                FlightPickUp.objects.filter(picker=user_id),
            ))

class ProfileImageUploadView(views.APIView):
    """
    ProfileImageUploadView APIView\n
    Update User Profile Picture
    """
    # parser_classes = (FileUploadParser,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def put(self, request, format=None):
        image_code = request.data['image_code']
        image_code = image_code.split('base64,')[1]
        image_data = b64decode(image_code)
        user = request.user
        profile = user.profile
        # delete original profile pic
        if profile.avatar:
            profile.avatar.delete(save=False)
        profile.avatar = ContentFile(image_data, user.username + ".png")
        profile.save()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#                               Legacy Code                                     #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
class CurrentUserView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return response.Response(serializer.data)

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MyProfileDetail(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_object(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        user = request.user
        profile = user.profile
        serializer = UserProfileSerializer(profile)
        return response.Response(serializer.data)

    def put(self, request, format=None):
        user = request.user
        profile = user.profile
        serializer = UserProfileSerializer(profile, data=request.DATA, files=request.FILES)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserToUniversityCreate(views.APIView):
#     """
#     UserToUniversityCreate APIView
#     Create UserToUniversity
#     UserToUniversityCreate.as_view() => accounts/api/touniversity/create/
#     """
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

#     def post(self, request, university_id, format=None):
#         user = request.user
#         data = JSONParser().parse(request)
#         # Test those two params
#         print university_id
#         print data
#         # if serializer.is_valid():
#             # serializer.save()
#             # return response.Response(serializer.data)
#         return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

