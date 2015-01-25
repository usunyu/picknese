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

class PickUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = PickUp