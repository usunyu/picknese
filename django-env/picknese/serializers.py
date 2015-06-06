from rest_framework import serializers

from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer

class HomeFeedSerializer(serializers.Serializer):
    """
    Read Only Endpoint for HomeFeed
    Support nested Serializer
    """
    id = serializers.IntegerField(read_only=True)

    feed_type = serializers.IntegerField()

    requester = UserSerializer(read_only=True, required=False)
    university = UniversitySerializer(read_only=True, required=False)

    price = serializers.IntegerField(default=20, required=False)
    start = serializers.CharField(max_length=200, required=False)
    flight = serializers.CharField(max_length=30, required=False)
    date_time = serializers.DateTimeField(required=False)
    destination = serializers.CharField(max_length=200, required=False)
    bags = serializers.IntegerField(required=False)
    description = serializers.CharField(required=False)
    confirmed = serializers.BooleanField(required=False)
    created = serializers.DateTimeField(required=False)

class AuthSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    redirect_url = serializers.CharField(required=False)
    request_type = serializers.IntegerField(required=False)
