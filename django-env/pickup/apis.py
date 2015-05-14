from django.db.models import Q
from rest_framework import generics, permissions, views, renderers, response
from pickup import serializers, models

class FlightPickRequestList(generics.ListAPIView):
    """
    FlightPickRequestList ListAPIView
    Retrieve FlightPickRequests based on University ID
    FlightPickRequestList.as_view() => pickup/api/flight_pick_request/1/
    """
    serializer_class = serializers.FlightPickRequestListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return models.FlightPickRequest.objects.filter(university=university_id)

class FlightPickRequestCreate(generics.CreateAPIView):
    """
    FlightPickRequestCreate CreateAPIView
    Create FlightPickRequest
    FlightPickRequestCreate.as_view() => pickup/api/flight_pick_request/create/
    """
    serializer_class = serializers.FlightPickRequestMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class PickRequesterList(generics.ListAPIView):
    """
    PickRequesterList ListAPIView
    Retrieve PickRequesters based on University ID
    PickRequesterList.as_view() => pickup/api/requesters/1/
    """
    serializer_class = serializers.PickRequesterListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return models.PickRequester.objects.filter(university=university_id)

class MyPickRequestList(generics.ListAPIView):
    """
    MyPickRequestList ListAPIView
    Retrieve PickRequesters based on University ID and Request User ID
    MyPickRequestList.as_view() => pickup/api/requesters/mylist/1/
    """
    serializer_class = serializers.PickRequesterListSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        university_id = self.kwargs['university_id']
        return models.PickRequester.objects.filter(
            Q(university=university_id) & 
            Q(requester=user.id)
        )

class MyAllPickRequestList(generics.ListAPIView):
    """
    MyAllPickRequestList ListAPIView
    Retrieve PickRequesters based on Request User ID
    MyAllPickRequestList.as_view() => pickup/api/requesters/mylist/all/
    """
    serializer_class = serializers.PickRequesterListSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return models.PickRequester.objects.filter(
            Q(requester=user.id)
        )

class PickRequesterCreate(generics.CreateAPIView):
    """
    PickRequesterCreate CreateAPIView
    Create PickRequester
    PickRequesterCreate.as_view() => pickup/api/requesters/create/
    """
    serializer_class = serializers.PickRequesterMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def perform_create(self, serializer):
    #     date_time = serializer.data['date_time']
    #     serializer.save()

class PickRequesterMutate(generics.RetrieveUpdateDestroyAPIView):
    """
    PickRequesterMutate RetrieveUpdateDestroyAPIView
    Retrieve, Update, Delete PickRequester
    PickRequesterMutate.as_view() => pickup/api/requesters/mutate/1/
    """
    serializer_class = serializers.PickRequesterMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.PickRequester.objects.all()

class PickUpList(generics.ListAPIView):
    """
    PickUpList ListAPIView
    Retrieve PickUps based on University ID
    PickUpList.as_view() => pickup/api/1/
    """
    serializer_class = serializers.PickUpListSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return models.PickUp.objects.filter(university=university_id)

class MyPickUpList(generics.ListAPIView):
    """
    MyPickUpList ListAPIView
    Retrieve PickUps based on University ID and Request User ID
    MyPickUpList.as_view() => pickup/api/mylist/1/
    """
    serializer_class = serializers.PickUpListSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        university_id = self.kwargs['university_id']
        return models.PickUp.objects.filter(
            Q(university=university_id) & 
            (Q(picker=user.id) | Q(pickee=user.id))
        )

class MyAllPickUpList(generics.ListAPIView):
    """
    MyAllPickUpList ListAPIView
    Retrieve all PickUps based on Request User ID
    MyAllPickUpList.as_view() => pickup/api/mylist/all/
    """
    serializer_class = serializers.PickUpListSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return models.PickUp.objects.filter(
            (Q(picker=user.id) | Q(pickee=user.id))
        )

class PickUpCreate(generics.CreateAPIView):
    """
    PickUpCreate CreateAPIView
    Create PickUp
    PickUpCreate.as_view() => pickup/api/create/
    """
    serializer_class = serializers.PickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class PickUpMutate(generics.RetrieveUpdateDestroyAPIView):
    """
    PickUpMutate RetrieveUpdateDestroyAPIView
    Retrieve, Update, Delete PickUp
    PickUpMutate.as_view() => pickup/api/mutate/1
    """
    serializer_class = serializers.PickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.PickUp.objects.all()

class MyPickUpRequestCount(views.APIView):
    """
    A view that returns the count of current user's pick up request count
    based on University
    MyPickUpRequestCount.as_view() => pickup/api/mylist/count/1/
    """
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # renderer_classes = (renderers.JSONRenderer)

    def get(self, request, university_id, format=None):
        user = request.user
        pickup_count = models.PickUp.objects.filter(
            Q(university=university_id) & 
            (Q(picker=user.id) | Q(pickee=user.id))
        ).count()
        request_count = models.PickRequester.objects.filter(
            Q(university=university_id) & 
            Q(requester=user.id)
        ).count()
        content = {'my_pick_count': pickup_count + request_count}
        return response.Response(content)

class MyAllPickUpRequestCount(views.APIView):
    """
    A view that returns the count of current user's pick up request count
    based on University
    MyAllPickUpRequestCount.as_view() => pickup/api/mylist/count/all/
    """
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # renderer_classes = (renderers.JSONRenderer)

    def get(self, request, format=None):
        user = request.user
        pickup_count = models.PickUp.objects.filter(
            Q(picker=user.id) | Q(pickee=user.id)
        ).count()
        request_count = models.PickRequester.objects.filter(
            Q(requester=user.id)
        ).count()
        content = {'my_pick_count': pickup_count + request_count}
        return response.Response(content)
