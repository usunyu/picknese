# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0002_auto_20150217_0551'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pickup', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PickProvider',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('listed', models.BooleanField(default=True)),
                ('picker', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('university', models.ForeignKey(to='university.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PickRequester',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pick_type', models.IntegerField(default=1, choices=[(1, b'Flight'), (2, b'General')])),
                ('price', models.IntegerField(default=20)),
                ('flight', models.CharField(max_length=20, null=True, verbose_name=b'Flight#', blank=True)),
                ('destination', models.CharField(default=b'Near Campus', max_length=200)),
                ('confirmed', models.BooleanField(default=False)),
                ('description', models.TextField(null=True, blank=True)),
                ('requester', models.ForeignKey(related_name='pick_pequester', to=settings.AUTH_USER_MODEL)),
                ('university', models.ForeignKey(to='university.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterUniqueTogether(
            name='pickprovider',
            unique_together=set([('picker', 'university')]),
        ),
        migrations.AddField(
            model_name='pickup',
            name='description',
            field=models.TextField(null=True, verbose_name=b'Message', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickup',
            name='destination',
            field=models.CharField(default=b'Near Campus', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickup',
            name='pick_type',
            field=models.IntegerField(default=1, choices=[(1, b'Flight'), (2, b'General')]),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickup',
            name='price',
            field=models.IntegerField(default=20),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pickup',
            name='university',
            field=models.ForeignKey(to='university.University', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pickup',
            name='flight',
            field=models.CharField(default=b'N\\A', max_length=20, verbose_name=b'Flight#', blank=True),
            preserve_default=True,
        ),
    ]
