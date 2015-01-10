from django.db import models
from django.contrib.auth.models import User
from university.models import University

class PickProvider(models.Model):
	picker = models.ForeignKey(User)
	university = models.ForeignKey(University)
	# TODO: delete
	price = models.IntegerField(default=20)
	# TODO: delete
	description = models.TextField(null=True, blank=True)
	# TODO: check listed, user can unlist, when listed, notify
	listed = models.BooleanField(default=True)

	class Meta:
		unique_together = (("picker", "university"),)

	def __str__(self):	# __unicode__ on Python 2
		return 'Picker: %s, University: %s' % (self.picker.username, self.university)

class PickRequester(models.Model):
	requester = models.ForeignKey(User)
	university = models.ForeignKey(University)
	type_choices = (
		(1, 'Flight'),
		(2, 'General'),
	)
	pick_type = models.IntegerField(choices=type_choices, default=1)
	price = models.IntegerField(default=20)
	flight = models.CharField(max_length=20, null=True, blank=True)
	confirmed = models.BooleanField(default=False)
	description = models.TextField(null=True, blank=True)

	def __str__(self):	# __unicode__ on Python 2
		return 'Requester: %s, University: %s' % (self.requester.username, self.university)

class PickUp(models.Model):
	picker = models.ForeignKey(User, related_name='pickup_picker')
	pickee = models.ForeignKey(User, related_name='pickup_pickee')
	university = models.ForeignKey(University)
	flight = models.CharField(max_length=20)
	# requester description
	description = models.TextField(null=True, blank=True)
	confirmed = models.BooleanField(default=False)

	class Meta:
		unique_together = (("picker", "pickee", "flight"),)

	def __str__(self):	# __unicode__ on Python 2
		return 'Picker: %s, Pickee: %s' % (self.picker.username, self.pickee.username)