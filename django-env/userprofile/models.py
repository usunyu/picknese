from django.db import models
from django.contrib.auth.models import User

from university.models import University

from picknese import settings
from picknese.utils import get_upload_file_name

class UserProfile(models.Model):
	user = models.OneToOneField(User)
	university = models.ForeignKey(University, null=True, blank=True)
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
	# contact info
	phone = models.CharField(max_length=15, null=True, blank=True)
	qq = models.CharField(max_length=15, null=True, blank=True)
	wechat = models.CharField(max_length=30, null=True, blank=True)
	introduction = models.TextField(null=True, blank=True)

	def __str__(self):	# __unicode__ on Python 2
		return 'Profile of user: %s' % self.user.username

	def get_avatar(self):
		avatar = str(self.avatar)
		if settings.PRODUCTION:
			avatar = avatar.replace('media/', '')
		if avatar == '':
			avatar = "default_pic.png"
		return avatar

# Create User Profile as needed
User.profile = property(
	lambda u: UserProfile.objects.get_or_create(user=u)[0]
)

# class UserToUniversity(models.Model):
# 	user = models.OneToOneField(User)
# 	university = models.OneToOneField(University)
# 	start_year = models.IntegerField(default=0)
# 	end_year = models.IntegerField(default=0)
