from time import time
from django.db import models
from django.contrib.auth.models import User

def get_upload_file_name(instance, filename):
	return "images/%s_%s" % (str(time()).replace('.','_'), filename)

# Create your models here.
class UserProfile(models.Model):
	user = models.OneToOneField(User)
	gender_choices = (
		('M', 'Male'),
		('F', 'Female'),
	)
	gender = models.CharField(
		max_length=1,
		choices=gender_choices,
		null=True,
		blank=True
	)
	# https://docs.djangoproject.com/en/1.7/topics/files/
	avatar = models.ImageField(
		'Profile Photo',
		upload_to=get_upload_file_name,
		null=True,
		blank=True
	)

	def __str__(self):	# __unicode__ on Python 2
		return 'Profile of user: %s' % self.user.username

# Create User Profile as needed
User.profile = property(
	lambda u: UserProfile.objects.get_or_create(user=u)[0]
)