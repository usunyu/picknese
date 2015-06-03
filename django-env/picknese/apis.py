import itertools, ast

from django.db.models import Q
from django.contrib import auth
from django.core.urlresolvers import reverse

from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from picknese import constants
from picknese.serializers import HomeFeedSerializer, AuthSerializer
from pickup.serializers import PickRequestMutateSerializer
from pickup.models import FlightPickRequest, PickRequest
from university.models import University

class HomeFeedList(generics.ListAPIView):
    """
    HomeFeedList ListAPIView\n
    Retrieve Home Feed based on University ID\n
    home/api/1/ => HomeFeedList.as_view() 
    """
    serializer_class = HomeFeedSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        feed_type = int(self.kwargs['feed_type'])

        if feed_type == constants.FLIGHT_PICK_REQUEST:
            return FlightPickRequest.objects.filter(Q(university=university_id) & Q(confirmed=False))

        if feed_type == constants.PICK_REQUEST:
            return PickRequest.objects.filter(Q(university=university_id) & Q(confirmed=False))

        if feed_type == constants.ALL_POST:
            return list(itertools.chain(
                FlightPickRequest.objects.filter(Q(university=university_id) & Q(confirmed=False)), 
                PickRequest.objects.filter(Q(university=university_id) & Q(confirmed=False)), 
            ))

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def auth_api_view(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    # if auth with request data, finish the request
    auth_with_data = request.POST.get('auth_with_data', '')
    auth_data_object = ast.literal_eval(auth_with_data)
    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        auth_data_object['requester'] = user
        university_id = auth_data_object.get('university')
        auth_data_object['university'] = University.objects.get(id=university_id)
        request_type = auth_data_object.get('feed_type')
        redirect_url = '/'

        if request_type == constants.FLIGHT_PICK_REQUEST:
            instance = FlightPickRequest(**auth_data_object)
            instance.save()
            redirect_url = reverse('picknese.views.home', args=[university_id])

        if request_type == constants.PICK_REQUEST:
            instance = PickRequest(**auth_data_object)
            instance.save()
            redirect_url = reverse('picknese.views.home', args=[university_id])

        serializer = AuthSerializer(data={
            'success': True,
            'redirect_url': redirect_url,
            'request_type': request_type,
        })
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        serializer = AuthSerializer(data={'success': False})
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
