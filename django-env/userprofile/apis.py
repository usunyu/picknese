from django.http import Http404

from rest_framework import permissions, response, generics, views, status

from userprofile.models import User, UserProfile
from userprofile.serializers import UserSerializer, UserProfileSerializer

class CurrentUserView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        print request
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