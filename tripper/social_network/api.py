from social_network.models import User, Profile, Reply, Post
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, PostSerializer, ReplySerializer, ProfileSerializer

#User viewsets
class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

#Profile viewsets
class ProfileViewSet(viewsets.ModelViewSet):
    queryset=Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

#Post viewsets
class PostViewSet(viewsets.ModelViewSet):
    queryset=Post.objects.all().order_by('-timestamp')
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#Reply viewsets
class ReplyViewSet(viewsets.ModelViewSet):
    queryset=Reply.objects.all()
    serializer_class = ReplySerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]