from django.contrib import admin
from pickup.models import PickUp, PickProvider, PickRequester

admin.site.register(PickUp)
admin.site.register(PickProvider)
admin.site.register(PickRequester)