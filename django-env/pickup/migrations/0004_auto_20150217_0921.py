# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0003_auto_20150217_0556'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pickup',
            name='university',
            field=models.ForeignKey(to='university.University'),
            preserve_default=True,
        ),
    ]
