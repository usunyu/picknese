from rest_framework import serializers

from userprofile.serializers import UserSerializer
from university.serializers import UniversitySerializer

class HomeFeedSerializer(serializers.Serializer):
    """
    Read Only Endpoint for HomeFeed
    Support nested Serializer
    """
    id = serializers.IntegerField(read_only=True)

    requester = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    price = serializers.IntegerField(default=20)
    flight = serializers.CharField(max_length=30)
    date_time = serializers.DateTimeField()
    destination = serializers.CharField(max_length=200)
    bags = serializers.IntegerField()
    feed_type = serializers.IntegerField()
    description = serializers.CharField()
    confirmed = serializers.BooleanField()
    created = serializers.DateTimeField()