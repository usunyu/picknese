from django.db import models
from django.contrib.auth.models import User
from university.models import University

# Create your models here.
class PickProvider(models.Model):
	picker = models.ForeignKey(User)
	university = models.ForeignKey(University)

	def __str__(self):	# __unicode__ on Python 2
		return self.picker.username + ' : ' + self.university.name

class PickUp(models.Model):
	picker = models.ForeignKey(User, related_name='pickup_picker')
	pickee = models.ForeignKey(User, related_name='pickup_pickee')
	flight = models.CharField(max_length=20)

	def __str__(self):	# __unicode__ on Python 2
		return self.picker.username + ' : ' + self.pickee.username