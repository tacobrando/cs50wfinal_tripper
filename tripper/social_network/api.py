from social_network.models import User, Profile, Reply, Post
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, PostSerializer, ReplySerializer, ProfileSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

#User viewsets
class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

#Profile viewsets
class ProfileViewSet(viewsets.ModelViewSet):
    lookup_field = 'pk'
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
    lookup_field = 'pk'

    @action(detail=True, methods=['POST'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = self.request.user

        if post.likes.filter(id=user.id).exists():
            post.likes.remove(user)
        else:
            post.likes.add(user)
            post.save()
        return Response(status=200)
    
    @action(detail=True, methods=['POST'])
    def reply(self, request, pk=None):
        post = self.get_object()
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            reply = serializer.save(user=request.user, post=post)
            post.replies.add(reply)
            post.save()
            return Response(ReplySerializer(reply).data, status=201)
        else:
            return Response(serializer.errors, status=400)
        
    @action(detail=True, methods=['GET'])
    def replies(self, request, pk=None):
        post = get_object_or_404(Post, pk=pk)
        replies = Reply.objects.filter(post=post)
        serializer = ReplySerializer(replies, many=True)
        return Response(serializer.data, status=200)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
