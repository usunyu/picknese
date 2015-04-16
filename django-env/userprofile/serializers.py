# Django
from django.contrib.auth.models import User

# REST Framework
from rest_framework import serializers

# userprofile app
from userprofile.models import UserProfile, UserToUniversity

# university app
from university.serializers import UniversitySerializer

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = ('id', 'last_login', 'username', 'first_name', 'last_name', 'email', 'profile')

"""
Read Only Endpoint for UserToUniversity
Support nested Serializer
"""
class UserToUniversityListSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = UserToUniversity


"""
Create, Update, Delete Endpoint for UserToUniversity
Flat Serializer
"""
class UserToUniversityMutateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserToUniversity