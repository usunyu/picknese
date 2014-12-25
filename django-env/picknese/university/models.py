from django.db import models

# Create your models here.
class University(models):
	name = models.CharField(max_length=50)
	shorthand = models.CharField(max_length=10)
	system = models.CharField(max_length=50)
	address = models.CharField(max_length=150)
	state = models.CharField(max_length=10)
	country = models.CharField(max_length=10)

	def __str__(self):	# __unicode__ on Python 2
		return self.name