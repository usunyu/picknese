from rest_framework import serializers
from university.models import University

class UniversitySerializer(serializers.ModelSerializer):

    class Meta:
        model = University

class UniversitySimpleSerializer(serializers.ModelSerializer):

	class Meta:
		model = University
		fields = ('id', 'name', 'shorthand')
