from django.db import models
from django.contrib.auth.models import User
from university.models import University

class PickProvider(models.Model):
	picker = models.ForeignKey(User)
	university = models.ForeignKey(University)
	price = models.IntegerField(default=20)
	# provider description
	description = models.TextField(null=True, blank=True)
	# TODO: check listed, user can unlist
	listed = models.BooleanField(default=True)

	class Meta:
		unique_together = (("picker", "university"),)

	def __str__(self):	# __unicode__ on Python 2
		return self.picker.username + ' : ' + self.university.name

class PickUp(models.Model):
	picker = models.ForeignKey(User, related_name='pickup_picker')
	pickee = models.ForeignKey(User, related_name='pickup_pickee')
	flight = models.CharField(max_length=20)
	# requester description
	description = models.TextField(null=True, blank=True)
	confirmed = models.BooleanField(default=False)

	class Meta:
		unique_together = (("picker", "pickee", "flight"),)

	def __str__(self):	# __unicode__ on Python 2
		return self.picker.username + ' : ' + self.pickee.username