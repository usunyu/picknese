from django.db import models

# Create your models here.
class University(models.Model):
	name = models.CharField(max_length=50)
	shorthand = models.CharField(max_length=10)
	url = models.CharField(max_length=100)
	description = models.TextField(null=True, blank=True)
	system = models.CharField(max_length=50, null=True, blank=True)
	address = models.CharField(max_length=150, null=True, blank=True)
	state = models.CharField(max_length=10)
	country = models.CharField(max_length=10)

	def __str__(self):	# __unicode__ on Python 2
		return self.name