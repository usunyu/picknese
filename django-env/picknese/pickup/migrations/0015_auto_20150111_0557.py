# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0014_auto_20150111_0546'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pickup',
            name='description',
            field=models.TextField(null=True, verbose_name=b'Message', blank=True),
            preserve_default=True,
        ),
    ]
