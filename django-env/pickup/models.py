from django.db import models
from django.contrib.auth.models import User
from university.models import University
from picknese import constants

class FlightPickRequest(models.Model):
    """
    FlightPickRequest Model
    Data for user post flight pick request
    """
    requester = models.ForeignKey(User)
    university = models.ForeignKey(University)
    price = models.IntegerField(default=20)
    flight = models.CharField(max_length=30)
    date_time = models.DateTimeField()
    destination = models.CharField(max_length=200)
    bags = models.IntegerField(default=1)
    feed_type = models.IntegerField(default=constants.FLIGHT_PICK_REQUEST)
    description = models.TextField(null=True, blank=True)
    confirmed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Requester: %s, University: %s' % (self.requester.username, self.university)

class FlightPickUp(models.Model):
    """
    FlightPickUp Model
    Data for user provide a flight pick up
    """
    flight_pick_request = models.ForeignKey(FlightPickRequest)
    requester = models.ForeignKey(User, related_name='flightpickup_requester')
    picker = models.ForeignKey(User, related_name='flightpickup_picker')
    feed_type = models.IntegerField(default=constants.FLIGHT_PICK_UP)
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Request: %s, Picker: %s' % (self.flight_pick_request, self.picker.username)

class PickRequest(models.Model):
    """
    PickRequest Model
    Data for user post normal pick request
    """
    requester = models.ForeignKey(User)
    university = models.ForeignKey(University)
    price = models.IntegerField(default=20)
    date_time = models.DateTimeField()
    start = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    feed_type = models.IntegerField(default=constants.PICK_REQUEST)
    description = models.TextField(null=True, blank=True)
    confirmed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Requester: %s, University: %s' % (self.requester.username, self.university)

class PickUp(models.Model):
    """
    PickUp Model
    Data for user provide a normal pick up
    """
    pick_request = models.ForeignKey(PickRequest)
    requester = models.ForeignKey(User, related_name='pickup_requester')
    picker = models.ForeignKey(User, related_name='pickup_picker')
    feed_type = models.IntegerField(default=constants.PICK_UP)
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Request: %s, Picker: %s' % (self.pick_request, self.picker.username)


# TODO: deprecate PickRequester
class PickRequester(models.Model):
    requester = models.ForeignKey(User, related_name='pick_pequester')
    university = models.ForeignKey(University)
    type_choices = ((1, 'Flight'),(2, 'General'))
    pick_type = models.IntegerField(choices=type_choices, default=1)
    price = models.IntegerField(default=20)
    # based on pick_type to determine flight or normal location
    # TODO: delete flight in database
    start = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    # for flight
    bags = models.IntegerField(default=1)
    # for general
    round_trip = models.BooleanField(default=False)
    time_flexible = models.BooleanField(default=False)
    # requester message
    description = models.TextField('Message', null=True, blank=True)
    date_time = models.DateTimeField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):  # __unicode__ on Python 2
        return 'Requester: %s, University: %s' % (self.requester.username, self.university)

# class PickUp(models.Model):
#     picker = models.ForeignKey(User, related_name='pickup_picker')
#     pickee = models.ForeignKey(User, related_name='pickup_pickee')
#     university = models.ForeignKey(University)
#     type_choices = ((1, 'Flight'),(2, 'General'))
#     pick_type = models.IntegerField(choices=type_choices, default=1)
#     price = models.IntegerField(default=20)
#     start = models.CharField(max_length=200)
#     destination = models.CharField(max_length=200)
#     # for flight
#     bags = models.IntegerField(default=1)
#     # for general
#     round_trip = models.BooleanField(default=False)
#     time_flexible = models.BooleanField(default=False)
#     # picker message
#     description = models.TextField('Message', null=True, blank=True)
#     date_time = models.DateTimeField()
#     created = models.DateTimeField(auto_now_add=True)

#     def __str__(self):  # __unicode__ on Python 2
#         return 'Picker: %s, Pickee: %s' % (self.picker.username, self.pickee.username)