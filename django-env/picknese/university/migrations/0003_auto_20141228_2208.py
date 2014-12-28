# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0002_auto_20141228_1126'),
    ]

    operations = [
        migrations.AlterField(
            model_name='university',
            name='address',
            field=models.CharField(max_length=150, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='university',
            name='description',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='university',
            name='system',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
    ]
