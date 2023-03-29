# Generated by Django 4.1.7 on 2023-03-29 01:11

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0002_conversation_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversation',
            name='messages',
            field=models.ManyToManyField(blank=True, related_name='messages', to='messaging.message'),
        ),
        migrations.AlterField(
            model_name='conversation',
            name='participants',
            field=models.ManyToManyField(related_name='participants', to=settings.AUTH_USER_MODEL),
        ),
    ]