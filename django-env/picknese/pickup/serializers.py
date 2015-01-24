from rest_framework import serializers
from pickup.models import PickProvider, PickRequester, PickUp


class PickProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = PickProvider

class PickRequesterSerializer(serializers.ModelSerializer):

    class Meta:
        model = PickRequester

class PickUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = PickUp