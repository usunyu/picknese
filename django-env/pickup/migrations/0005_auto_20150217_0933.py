# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0004_auto_20150217_0921'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickrequester',
            name='start',
            field=models.CharField(max_length=200, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickup',
            name='start',
            field=models.CharField(max_length=200, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pickrequester',
            name='destination',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pickup',
            name='destination',
            field=models.CharField(max_length=200),
            preserve_default=True,
        ),
    ]
