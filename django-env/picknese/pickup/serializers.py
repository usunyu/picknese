from rest_framework import serializers
from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer
from pickup.models import PickProvider, PickRequester, PickUp

class PickProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = PickProvider

class PickRequesterSerializer(serializers.ModelSerializer):
    requester = UserSerializer()
    university = UniversitySerializer()

    class Meta:
        model = PickRequester

class PickUpSerializer(serializers.ModelSerializer):
    # picker = UserSerializer()
    # pickee = UserSerializer()
    # university = UniversitySerializer()

    class Meta:
        model = PickUp
