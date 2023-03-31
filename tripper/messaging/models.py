from django.db import models
from social_network.models import User
# Create your models here.
class Conversation(models.Model):
    title=models.CharField(max_length=50, blank=True)
    participants=models.ManyToManyField(User, related_name="participants", blank=False)
    timestamp=models.DateTimeField(auto_now_add=True)
    messages=models.ManyToManyField('Message', related_name="messages", blank=True)

class Message(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    content=models.TextField(blank=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    conversation=models.OneToOneField(Conversation, on_delete=models.CASCADE)