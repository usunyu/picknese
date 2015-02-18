# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0002_auto_20150217_0551'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='university',
            name='system',
        ),
    ]
