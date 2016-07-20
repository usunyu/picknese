# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import picknese.utils
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('university', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gender', models.CharField(blank=True, max_length=1, null=True, choices=[(b'M', b'Male'), (b'F', b'Female')])),
                ('avatar', models.ImageField(upload_to=picknese.utils.get_upload_file_name, null=True, verbose_name=b'Profile Photo', blank=True)),
                ('birthday', models.DateField(null=True, blank=True)),
                ('phone', models.CharField(max_length=15, null=True, blank=True)),
                ('phone_verified', models.BooleanField(default=False)),
                ('qq', models.CharField(max_length=15, null=True, blank=True)),
                ('wechat', models.CharField(max_length=30, null=True, blank=True)),
                ('introduction', models.TextField(null=True, blank=True)),
                ('university', models.ForeignKey(blank=True, to='university.University', null=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
