from rest_framework.serializers import ModelSerializer
from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer
from pickup.models import FlightPickRequest, FlightPickUp, PickRequest, PickUp

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

class FlightPickUpListSerializer(ModelSerializer):
    """
    Read Only Endpoint for FlightPickUp
    Support nested Serializer
    """
    flight_pick_request = FlightPickRequestListSerializer(read_only=True)
    picker = UserSerializer(read_only=True)

    class Meta:
        model = FlightPickUp

class FlightPickUpMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for FlightPickUp
    Flat Serializer
    """
    class Meta:
        model = FlightPickUp

class PickRequestListSerializer(ModelSerializer):
    """
    Read Only Endpoint for PickRequest
    Support nested Serializer
    """
    requester = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = PickRequest

class PickRequestMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for PickRequest
    Flat Serializer
    """
    class Meta:
        model = PickRequest

class PickUpListSerializer(ModelSerializer):
    """
    Read Only Endpoint for PickUp
    Support nested Serializer
    """
    pick_request = PickRequestListSerializer(read_only=True)
    picker = UserSerializer(read_only=True)

    class Meta:
        model = PickUp

class PickUpMutateSerializer(ModelSerializer):
    """
    Create, Update, Delete Endpoint for PickUp
    Flat Serializer
    """
    class Meta:
        model = PickUp