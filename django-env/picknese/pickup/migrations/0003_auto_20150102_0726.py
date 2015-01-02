# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0002_pickprovider'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickprovider',
            name='description',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickprovider',
            name='price',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
