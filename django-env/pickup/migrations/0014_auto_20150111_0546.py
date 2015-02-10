# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0013_pickrequester_destination'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pickup',
            name='confirmed',
        ),
        migrations.AddField(
            model_name='pickup',
            name='destination',
            field=models.CharField(default=b'Near Campus', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickup',
            name='pick_type',
            field=models.IntegerField(default=1, choices=[(1, b'Flight'), (2, b'General')]),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickup',
            name='price',
            field=models.IntegerField(default=20),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pickup',
            name='flight',
            field=models.CharField(max_length=20, null=True, blank=True),
            preserve_default=True,
        ),
    ]
