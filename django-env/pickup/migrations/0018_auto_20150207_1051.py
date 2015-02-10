# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0017_auto_20150206_1020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pickrequester',
            name='requester',
            field=models.ForeignKey(related_name='pick_pequester', to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
