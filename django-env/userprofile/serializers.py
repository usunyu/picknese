# Django
from django.contrib.auth.models import User

# REST Framework
from rest_framework import serializers

# userprofile app
from userprofile.models import UserProfile

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

# class UserToUniversityListSerializer(serializers.ModelSerializer):
#     """
#     Read Only Endpoint for UserToUniversity
#     Support nested Serializer
#     """
#     requester = UserSerializer(read_only=True)
#     university = UniversitySerializer(read_only=True)

#     class Meta:
#         model = UserToUniversity

# class UserToUniversityMutateSerializer(serializers.ModelSerializer):
#     """
#     Create, Update, Delete Endpoint for UserToUniversity
#     Flat Serializer
#     """
#     class Meta:
#         model = UserToUniversity