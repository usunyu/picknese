from rest_framework.serializers import ModelSerializer
from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer
from pickup.models import PickProvider, PickRequester, PickUp

class PickProviderSerializer(ModelSerializer):

    class Meta:
        model = PickProvider

"""
Read Only Endpoint for PickRequester
Support nested Serializer
"""
class PickRequesterListSerializer(ModelSerializer):
    requester = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = PickRequester

"""
Create, Update, Delete Endpoint for PickRequester
Flat Serializer
"""
class PickRequesterMutateSerializer(ModelSerializer):

    class Meta:
        model = PickRequester

"""
Read Only Endpoint for PickUp
Support nested Serializer
"""
class PickUpListSerializer(ModelSerializer):
    picker = UserSerializer(read_only=True)
    pickee = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = PickUp

"""
Create, Update, Delete Endpoint for PickUp
Flat Serializer
"""
class PickUpMutateSerializer(ModelSerializer):

    class Meta:
        model = PickUp