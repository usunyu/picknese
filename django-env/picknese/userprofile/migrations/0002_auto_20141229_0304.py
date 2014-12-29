# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='gender',
            field=models.CharField(default=b'M', max_length=1, blank=True, choices=[(b'M', b'Male'), (b'F', b'Female'), (b'O', b'Other')]),
            preserve_default=True,
        ),
    ]
