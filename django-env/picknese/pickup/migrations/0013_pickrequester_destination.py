# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0012_pickrequester_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickrequester',
            name='destination',
            field=models.CharField(default=b'Near Campus', max_length=200),
            preserve_default=True,
        ),
    ]
