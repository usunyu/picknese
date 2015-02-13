# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import picknese.utils


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0007_auto_20150213_0536'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(upload_to=picknese.utils.get_upload_file_name, null=True, verbose_name=b'Profile Photo', blank=True),
            preserve_default=True,
        ),
    ]
