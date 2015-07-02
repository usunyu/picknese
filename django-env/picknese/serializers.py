from rest_framework import serializers

from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer
from pickup.serializers import FlightPickRequestListSerializer, PickRequestListSerializer

class HomeFeedSerializer(serializers.Serializer):
    """
    Read Only Endpoint for HomeFeed
    Support nested Serializer
    """
    id = serializers.IntegerField(read_only=True)

    feed_type = serializers.IntegerField()

    picker = UserSerializer(read_only=True, required=False)
    requester = UserSerializer(read_only=True, required=False)
    university = UniversitySerializer(read_only=True, required=False)

    flight_pick_request = FlightPickRequestListSerializer(read_only=True, required=False)
    pick_request = PickRequestListSerializer(read_only=True, required=False)

    price = serializers.IntegerField(required=False)
    start = serializers.CharField(max_length=200, required=False)
    flight = serializers.CharField(max_length=30, required=False)
    date_time = serializers.DateTimeField(required=False)
    destination = serializers.CharField(max_length=200, required=False)
    bags = serializers.IntegerField(required=False)
    description = serializers.CharField(required=False)
    confirmed = serializers.BooleanField(required=False)
    created = serializers.DateTimeField(required=False)

class AuthSerializer(serializers.Serializer):
    """
    Auth process response
    """
    success = serializers.BooleanField()
    redirect_url = serializers.CharField(required=False)
    request_type = serializers.IntegerField(required=False)
