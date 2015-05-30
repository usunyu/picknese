from django.contrib import admin
from pickup.models import PickRequester, FlightPickRequest, FlightPickUp, PickRequest, PickUp

admin.site.register(PickRequester)

admin.site.register(FlightPickRequest)
admin.site.register(FlightPickUp)

admin.site.register(PickRequest)
admin.site.register(PickUp)