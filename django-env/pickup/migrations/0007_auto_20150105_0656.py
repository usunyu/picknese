# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0006_pickprovider_listed'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='pickup',
            unique_together=set([('picker', 'pickee', 'flight')]),
        ),
    ]
