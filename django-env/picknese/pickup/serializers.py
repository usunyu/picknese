from rest_framework import serializers
from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer
from pickup.models import PickProvider, PickRequester, PickUp

class PickProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = PickProvider

class PickRequesterSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = PickRequester

"""
Read Only Endpoint for PickUp, support nested Serializer
"""
class PickUpListSerializer(serializers.ModelSerializer):
    picker = UserSerializer(read_only=True)
    pickee = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = PickUp

"""
Create Endpoint for PickUp, flat Serializer
"""
class PickUpCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PickUp