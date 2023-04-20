from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

class Post(models.Model):
    user=models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    content=models.TextField(blank=False)
    image=models.URLField(blank=True)
    likes=models.ManyToManyField(User, related_name="post_likes")
    timestamp=models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    user=models.ForeignKey(User, related_name="replies", on_delete=models.CASCADE)
    content=models.TextField(blank=False)
    timestamp=models.DateTimeField(auto_now_add=True)
    likes=models.ManyToManyField(User, related_name="reply_likes")
    post=models.ForeignKey(Post, on_delete=models.CASCADE)

class Profile(models.Model):
    user=models.ForeignKey(User, related_name="profiles", on_delete=models.CASCADE)
    posts=models.ManyToManyField(Post, related_name="user_posts", blank=True)
    description=models.TextField(max_length=250, blank=True)
    followers=models.ManyToManyField(User, related_name="user_followers", blank=True)
    following=models.ManyToManyField(User, related_name="user_following", blank=True)
