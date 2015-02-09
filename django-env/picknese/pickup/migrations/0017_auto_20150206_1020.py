# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0016_auto_20150113_0822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pickup',
            name='flight',
            field=models.CharField(default=b'N\\A', max_length=20, verbose_name=b'Flight#', blank=True),
            preserve_default=True,
        ),
    ]
