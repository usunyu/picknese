from django.db import models

# Create your models here.
class University(models.Model):
    name = models.CharField(max_length=50)
    shorthand = models.CharField(max_length=10)
    url = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    zip_code = models.CharField(max_length=10, null=True, blank=True)
    state = models.CharField(max_length=10, null=True, blank=True)
    country = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):  # __unicode__ on Python 2
        return self.name