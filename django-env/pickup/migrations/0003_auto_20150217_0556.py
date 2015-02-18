# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0002_auto_20150217_0551'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pickup',
            name='university',
            field=models.ForeignKey(blank=True, to='university.University', null=True),
            preserve_default=True,
        ),
    ]
