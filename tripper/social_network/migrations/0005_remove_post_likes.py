# Generated by Django 4.1.7 on 2023-04-20 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('social_network', '0004_alter_post_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
    ]
