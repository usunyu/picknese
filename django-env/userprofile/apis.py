from rest_framework import permissions, response, generics, views

from userprofile.models import User
from userprofile.serializers import UserSerializer

class CurrentUserView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
    	print request
        serializer = UserSerializer(request.user)
        return response.Response(serializer.data)

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer