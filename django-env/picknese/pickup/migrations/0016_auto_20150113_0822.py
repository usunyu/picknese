# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0015_auto_20150111_0557'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pickprovider',
            name='description',
        ),
        migrations.RemoveField(
            model_name='pickprovider',
            name='price',
        ),
        migrations.AlterField(
            model_name='pickrequester',
            name='flight',
            field=models.CharField(max_length=20, null=True, verbose_name=b'Flight#', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pickup',
            name='flight',
            field=models.CharField(max_length=20, null=True, verbose_name=b'Flight#', blank=True),
            preserve_default=True,
        ),
    ]
