# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('shorthand', models.CharField(max_length=10)),
                ('url', models.CharField(max_length=100)),
                ('system', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=150)),
                ('state', models.CharField(max_length=10)),
                ('country', models.CharField(max_length=10)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
