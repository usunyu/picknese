# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0005_auto_20150105_0531'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickprovider',
            name='listed',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
