from django.contrib import admin
from pickup.models import PickUp, PickProvider

# Register your models here.
admin.site.register(PickUp)
admin.site.register(PickProvider)