# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0010_pickrequester'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pickrequester',
            name='pick_type',
            field=models.IntegerField(default=1, choices=[(1, b'Flight'), (2, b'General')]),
            preserve_default=True,
        ),
    ]
