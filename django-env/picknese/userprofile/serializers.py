from rest_framework import serializers
from django.contrib.auth.models import User
from userprofile.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = ('id', 'last_login', 'username', 'first_name', 'last_name', 'email', 'profile')

class RegistrationSerializer(serializers.ModelSerializer):
	
    class Meta:
        model = User
        fields = ('username', 'password')