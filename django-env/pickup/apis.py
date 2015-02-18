from django.db.models import Q
from rest_framework import generics, permissions
from pickup import serializers, models

"""
PickRequesterList ListAPIView
Retrieve PickRequesters based on University ID
PickRequesterList.as_view() => pickup/api/requesters/1/
"""
class PickRequesterList(generics.ListAPIView):
    serializer_class = serializers.PickRequesterListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return models.PickRequester.objects.filter(university=university_id, confirmed=False)

"""
MyPickRequestList ListAPIView
Retrieve PickRequesters based on University ID and Request User ID
MyPickRequestList.as_view() => pickup/api/requesters/mylist/1/
"""
class MyPickRequestList(generics.ListAPIView):
    serializer_class = serializers.PickRequesterListSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        university_id = self.kwargs['university_id']
        return models.PickRequester.objects.filter(
            Q(university=university_id) & 
            Q(requester=user.id) &
            Q(confirmed = False)
        )

"""
PickRequesterCreate CreateAPIView
Create PickRequester
PickRequesterCreate.as_view() => pickup/api/requesters/create/
"""
class PickRequesterCreate(generics.CreateAPIView):
    serializer_class = serializers.PickRequesterMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

"""
PickRequesterMutate RetrieveUpdateDestroyAPIView
Retrieve, Update, Delete PickRequester
PickRequesterMutate.as_view() => pickup/api/requesters/mutate/1/
"""
class PickRequesterMutate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PickRequesterMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.PickRequester.objects.all()

"""
PickUpList ListAPIView
Retrieve PickUps based on University ID
PickUpList.as_view() => pickup/api/1/
"""
class PickUpList(generics.ListAPIView):
    serializer_class = serializers.PickUpListSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return models.PickUp.objects.filter(university=university_id)

"""
MyPickUpList ListAPIView
Retrieve PickUps based on University ID and Request User ID
MyPickUpList.as_view() => pickup/api/mylist/1/
"""
class MyPickUpList(generics.ListAPIView):
    serializer_class = serializers.PickUpListSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        university_id = self.kwargs['university_id']
        return models.PickUp.objects.filter(
            Q(university=university_id) & 
            (Q(picker=user.id) | Q(pickee=user.id))
        )

"""
PickUpCreate CreateAPIView
Create PickUp
PickUpCreate.as_view() => pickup/api/create/
"""
class PickUpCreate(generics.CreateAPIView):
    serializer_class = serializers.PickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

"""
PickUpMutate RetrieveUpdateDestroyAPIView
Retrieve, Update, Delete PickUp
PickUpMutate.as_view() => pickup/api/mutate/1
"""
class PickUpMutate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PickUpMutateSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.PickUp.objects.all()
