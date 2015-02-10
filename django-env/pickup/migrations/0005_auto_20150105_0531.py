# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0004_auto_20150104_0612'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='pickprovider',
            unique_together=set([('picker', 'university')]),
        ),
    ]
