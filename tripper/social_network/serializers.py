from rest_framework import serializers
from social_network.models import User, Post, Profile, Reply
from django.contrib.auth.hashers import make_password

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True
    )
    class Meta:
        model=User
        fields='__all__'

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
    class Meta:
        model=Post
        field='__all__'

#Reply Serializer
class ReplySerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    likes=UserSerializer(many=True, read_only=True)
    post=PostSerializer(many=False, read_only=True)
    class Meta:
        model=Reply
        field='__all__'