from django.contrib import admin
from pickup.models import PickUp, PickRequester, FlightPickRequest, PickRequest

admin.site.register(PickUp)
admin.site.register(PickRequester)

admin.site.register(FlightPickRequest)
admin.site.register(PickRequest)