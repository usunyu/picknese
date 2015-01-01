# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0004_auto_20141228_2223'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pickup', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PickProvider',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('picker', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('university', models.ForeignKey(to='university.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
