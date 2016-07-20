# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('university', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FlightPickRequest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('price', models.IntegerField(default=20)),
                ('flight', models.CharField(max_length=30)),
                ('date_time', models.DateTimeField()),
                ('destination', models.CharField(max_length=200)),
                ('bags', models.IntegerField(default=1)),
                ('feed_type', models.IntegerField(default=3)),
                ('description', models.TextField(null=True, blank=True)),
                ('confirmed', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('requester', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('university', models.ForeignKey(to='university.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FlightPickUp',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('feed_type', models.IntegerField(default=4)),
                ('description', models.TextField(null=True, blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('flight_pick_request', models.ForeignKey(to='pickup.FlightPickRequest')),
                ('picker', models.ForeignKey(related_name='flightpickup_picker', to=settings.AUTH_USER_MODEL)),
                ('requester', models.ForeignKey(related_name='flightpickup_requester', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PickRequest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('price', models.IntegerField(default=20)),
                ('date_time', models.DateTimeField()),
                ('start', models.CharField(max_length=200)),
                ('destination', models.CharField(max_length=200)),
                ('feed_type', models.IntegerField(default=1)),
                ('description', models.TextField(null=True, blank=True)),
                ('confirmed', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('requester', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('university', models.ForeignKey(to='university.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PickUp',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('feed_type', models.IntegerField(default=2)),
                ('description', models.TextField(null=True, blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('pick_request', models.ForeignKey(to='pickup.PickRequest')),
                ('picker', models.ForeignKey(related_name='pickup_picker', to=settings.AUTH_USER_MODEL)),
                ('requester', models.ForeignKey(related_name='pickup_requester', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
