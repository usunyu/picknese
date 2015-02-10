# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0004_auto_20141228_2223'),
        ('pickup', '0008_pickup_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickup',
            name='university',
            field=models.ForeignKey(default='', to='university.University'),
            preserve_default=False,
        ),
    ]
