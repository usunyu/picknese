# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0003_auto_20150102_0726'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickup',
            name='confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pickprovider',
            name='price',
            field=models.IntegerField(default=20),
            preserve_default=True,
        ),
    ]
