from django.contrib import admin
from pickup.models import FlightPickRequest, FlightPickUp, PickRequest, PickUp

admin.site.register(FlightPickRequest)
admin.site.register(FlightPickUp)

admin.site.register(PickRequest)
admin.site.register(PickUp)