# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('university', '0003_remove_university_system'),
    ]

    operations = [
        migrations.CreateModel(
            name='PickRequester',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pick_type', models.IntegerField(default=1, choices=[(1, b'Flight'), (2, b'General')])),
                ('price', models.IntegerField(default=20)),
                ('start', models.CharField(max_length=200)),
                ('destination', models.CharField(max_length=200)),
                ('confirmed', models.BooleanField(default=False)),
                ('description', models.TextField(null=True, verbose_name=b'Message', blank=True)),
                ('requester', models.ForeignKey(related_name='pick_pequester', to=settings.AUTH_USER_MODEL)),
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
                ('pick_type', models.IntegerField(default=1, choices=[(1, b'Flight'), (2, b'General')])),
                ('price', models.IntegerField(default=20)),
                ('start', models.CharField(max_length=200)),
                ('destination', models.CharField(max_length=200)),
                ('description', models.TextField(null=True, verbose_name=b'Message', blank=True)),
                ('pickee', models.ForeignKey(related_name='pickup_pickee', to=settings.AUTH_USER_MODEL)),
                ('picker', models.ForeignKey(related_name='pickup_picker', to=settings.AUTH_USER_MODEL)),
                ('university', models.ForeignKey(to='university.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
