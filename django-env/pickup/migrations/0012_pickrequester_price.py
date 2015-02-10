# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0011_auto_20150110_0649'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickrequester',
            name='price',
            field=models.IntegerField(default=20),
            preserve_default=True,
        ),
    ]
