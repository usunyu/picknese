from rest_framework.serializers import ModelSerializer
from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer
from pickup.models import PickRequester, PickUp, FlightPickRequest

class FlightPickRequestListSerializer(ModelSerializer):
    """
    Read Only Endpoint for FlightPickRequest
    Support nested Serializer
    """
    requester = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = FlightPickRequest

class FlightPickRequestMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for FlightPickRequest
    Flat Serializer
    """
    class Meta:
        model = FlightPickRequest

class PickRequesterListSerializer(ModelSerializer):
    """
    Read Only Endpoint for PickRequester
    Support nested Serializer
    """
    requester = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = PickRequester

class PickRequesterMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for PickRequester
    Flat Serializer
    """
    class Meta:
        model = PickRequester

class PickUpListSerializer(ModelSerializer):
    """
    Read Only Endpoint for PickUp
    Support nested Serializer
    """
    picker = UserSerializer(read_only=True)
    pickee = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = PickUp

class PickUpMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for PickUp
    Flat Serializer
    """
    class Meta:
        model = PickUp