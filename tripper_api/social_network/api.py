from social_network.models import User, Profile, Reply, Post
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, PostSerializer, ReplySerializer, ProfileSerializer

#User viewsets
class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

#Profile viewsets
class ProfileViewSet(viewsets.ModelViewSet):
    queryset=Profile.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfileSerializer

#Post viewsets
class PostViewSet(viewsets.ModelViewSet):
    queryset=Post.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PostSerializer

#Reply viewsets
class ReplyViewSet(viewsets.ModelViewSet):
    queryset=Reply.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ReplySerializer