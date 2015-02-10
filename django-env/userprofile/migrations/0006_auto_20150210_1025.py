# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import userprofile.models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0005_auto_20141229_0647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(upload_to=userprofile.models.get_upload_file_name, null=True, verbose_name=b'Profile Photo', blank=True),
            preserve_default=True,
        ),
    ]
