import itertools
from django.db.models import Q
from rest_framework import generics, permissions

from picknese.serializers import HomeFeedSerializer
from pickup.models import FlightPickRequest, PickRequest

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

        return list(itertools.chain(
            FlightPickRequest.objects.filter(Q(university=university_id) & Q(confirmed=False)), 
            PickRequest.objects.filter(Q(university=university_id) & Q(confirmed=False)), 
        ))