# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0004_auto_20141228_2223'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pickup', '0009_pickup_university'),
    ]

    operations = [
        migrations.CreateModel(
            name='PickRequester',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pick_type', models.IntegerField()),
                ('flight', models.CharField(max_length=20, null=True, blank=True)),
                ('confirmed', models.BooleanField(default=False)),
                ('description', models.TextField(null=True, blank=True)),
                ('requester', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('university', models.ForeignKey(to='university.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
