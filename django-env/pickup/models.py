from django.db import models
from django.contrib.auth.models import User
from university.models import University

class PickRequester(models.Model):
	requester = models.ForeignKey(User, related_name='pick_pequester')
	university = models.ForeignKey(University)
	type_choices = (
		(1, 'Flight'),
		(2, 'General'),
	)
	pick_type = models.IntegerField(choices=type_choices, default=1)
	price = models.IntegerField(default=20)
	flight = models.CharField('Flight#', max_length=20, null=True, blank=True)
	start = models.CharField(max_length=200, null=True, blank=True)
	destination = models.CharField(max_length=200)
	confirmed = models.BooleanField(default=False)
	description = models.TextField(null=True, blank=True)

	def __str__(self):	# __unicode__ on Python 2
		return 'Requester: %s, University: %s' % (self.requester.username, self.university)

class PickUp(models.Model):
	picker = models.ForeignKey(User, related_name='pickup_picker')
	pickee = models.ForeignKey(User, related_name='pickup_pickee')
	university = models.ForeignKey(University)
	type_choices = (
		(1, 'Flight'),
		(2, 'General'),
	)
	pick_type = models.IntegerField(choices=type_choices, default=1)
	flight = models.CharField('Flight#', max_length=20, default="N\A", blank=True)
	price = models.IntegerField(default=20)
	start = models.CharField(max_length=200, null=True, blank=True)
	destination = models.CharField(max_length=200)
	# requester description
	description = models.TextField('Message', null=True, blank=True)

	def __str__(self):	# __unicode__ on Python 2
		return 'Picker: %s, Pickee: %s' % (self.picker.username, self.pickee.username)