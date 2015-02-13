# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import picknese.utils


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0006_auto_20150210_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(upload_to=picknese.utils.get_upload_file_name, null=True, verbose_name=b'Profile Pic', blank=True),
            preserve_default=True,
        ),
    ]
