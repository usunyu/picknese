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
                ('description', models.TextField(null=True, blank=True)),
                ('address', models.CharField(max_length=150, null=True, blank=True)),
                ('city', models.CharField(max_length=30, null=True, blank=True)),
                ('zip_code', models.CharField(max_length=10, null=True, blank=True)),
                ('state', models.CharField(max_length=10, null=True, blank=True)),
                ('country', models.CharField(max_length=10, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
