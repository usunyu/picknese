from django.db.models import Q
from rest_framework import generics, permissions, views, renderers, response
from pickup import serializers, models

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                           FlightPickRequest                                   #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
class FlightPickRequestList(generics.ListAPIView):
    """
    Retrieve FlightPickRequests based on University ID
    FlightPickRequestList.as_view() => pickup/api/flight_request/1/
    """
    serializer_class = serializers.FlightPickRequestListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return models.FlightPickRequest.objects.filter(university=university_id)

class FlightPickRequestCreate(generics.CreateAPIView):
    """
    Create FlightPickRequest
    FlightPickRequestCreate.as_view() => pickup/api/flight_request/create/
    """
    serializer_class = serializers.FlightPickRequestMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class FlightPickRequestMutate(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update, Delete FlightPickRequest
    FlightPickRequestMutate.as_view() => pickup/api/flight/mutate/1/
    """
    serializer_class = serializers.FlightPickRequestMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.FlightPickRequest.objects.all()

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                              FlightPickUp                                     #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
class FlightPickUpList(generics.ListAPIView):
    """
    Retrieve FlightPickUps based on User ID
    FlightPickUpList.as_view() => pickup/api/flight_pickup/1/
    """
    serializer_class = serializers.FlightPickUpListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        user_id = self.request.user.id
        return models.FlightPickUp.objects.filter(picker=user_id)

class FlightPickUpCreate(generics.CreateAPIView):
    """
    Create FlightPickUp
    FlightPickUpCreate.as_view() => pickup/api/flight_pickup/create/
    """
    serializer_class = serializers.FlightPickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        # update flight pick request
        request_id = serializer.data['flight_pick_request']
        request = models.FlightPickRequest.objects.get(id=request_id)
        request.confirmed = True
        request.save()
        # create flight pick up
        serializer.save()

class FlightPickUpMutate(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update, Delete FlightPickUp
    FlightPickUpMutate.as_view() => pickup/api/flight_pickup/mutate/1/
    """
    serializer_class = serializers.FlightPickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.FlightPickUp.objects.all()

    def perform_destroy(self, instance):
        flight_pick_request = instance.flight_pick_request
        flight_pick_request.confirmed = False
        flight_pick_request.save()
        instance.delete()

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                               PickRequest                                     #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
class PickRequestList(generics.ListAPIView):
    """
    Retrieve PickRequests based on University ID
    PickRequestList.as_view() => pickup/api/request/1/
    """
    serializer_class = serializers.PickRequestListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return models.PickRequest.objects.filter(university=university_id)

class PickRequestCreate(generics.CreateAPIView):
    """
    Create PickRequest
    PickRequestCreate.as_view() => pickup/api/request/create/
    """
    serializer_class = serializers.PickRequestMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class PickRequestMutate(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update, Delete PickRequest
    PickRequestMutate.as_view() => pickup/api/request/mutate/1/
    """
    serializer_class = serializers.PickRequestMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.PickRequest.objects.all()


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                 PickUp                                        #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
class PickUpList(generics.ListAPIView):
    """
    Retrieve PickUps based on User ID
    PickUpList.as_view() => pickup/api/pickup/1/
    """
    serializer_class = serializers.PickUpListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        user_id = self.request.user.id
        return models.PickUp.objects.filter(picker=user_id)

class PickUpCreate(generics.CreateAPIView):
    """
    Create PickUp
    PickUpCreate.as_view() => pickup/api/pickup/create/
    """
    serializer_class = serializers.PickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        # update pick request
        request_id = serializer.data['pick_request']
        request = models.PickRequest.objects.get(id=request_id)
        request.confirmed = True
        request.save()
        # create pick up
        serializer.save()

class PickUpMutate(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update, Delete PickUp
    PickUpMutate.as_view() => pickup/api/pickup/mutate/1/
    """
    serializer_class = serializers.PickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.PickUp.objects.all()

    def perform_destroy(self, instance):
        pick_request = instance.pick_request
        pick_request.confirmed = False
        pick_request.save()
        instance.delete()

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#                               Legacy Code                                     #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
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

# class PickUpList(generics.ListAPIView):
#     """
#     PickUpList ListAPIView
#     Retrieve PickUps based on University ID
#     PickUpList.as_view() => pickup/api/1/
#     """
#     serializer_class = serializers.PickUpListSerializer
#     # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#     permission_classes = (permissions.AllowAny,)

#     def get_queryset(self):
#         university_id = self.kwargs['university_id']
#         return models.PickUp.objects.filter(university=university_id)

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

# class PickUpCreate(generics.CreateAPIView):
#     """
#     PickUpCreate CreateAPIView
#     Create PickUp
#     PickUpCreate.as_view() => pickup/api/create/
#     """
#     serializer_class = serializers.PickUpMutateSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# class PickUpMutate(generics.RetrieveUpdateDestroyAPIView):
#     """
#     PickUpMutate RetrieveUpdateDestroyAPIView
#     Retrieve, Update, Delete PickUp
#     PickUpMutate.as_view() => pickup/api/mutate/1
#     """
#     serializer_class = serializers.PickUpMutateSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#     queryset = models.PickUp.objects.all()

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
