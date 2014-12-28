from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PickUp(models.Model):
	picker = models.ForeignKey(User, related_name='pickup_picker')
	pickee = models.ForeignKey(User, related_name='pickup_pickee')
	flight = models.CharField(max_length=20)

	def __str__(self):	# __unicode__ on Python 2
		return self.picker.username + ' picks ' + self.pickee.username