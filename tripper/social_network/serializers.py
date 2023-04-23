from rest_framework import serializers
from social_network.models import User, Post, Profile, Reply
from django.contrib.auth.hashers import make_password

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id', 'username', 'email')

#Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    followers=UserSerializer(many=True, read_only=True)
    following=UserSerializer(many=True, read_only=True)
    class Meta:
        model=Profile
        fields='__all__'

#Post Serializer
class PostSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    likes=UserSerializer(many=True, read_only=True)
    replies = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model=Post
        fields='__all__'
        

#Reply Serializer
class ReplySerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    likes=UserSerializer(many=True, read_only=True)
    post=PostSerializer(many=False, read_only=True)

    class Meta:
        model=Reply
        fields='__all__'
