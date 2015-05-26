from django.contrib import admin
from pickup.models import PickUp, PickRequester, FlightPickRequest

admin.site.register(PickUp)
admin.site.register(PickRequester)

admin.site.register(FlightPickRequest)