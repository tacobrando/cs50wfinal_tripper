from messaging.models import Conversation, Message
from rest_framework import viewsets, permissions
from .serializers import ConversationSerializer, MessageSerializer

#Conversation viewsets
class ConversationViewSet(viewsets.ModelViewSet):
    queryset=Conversation.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ConversationSerializer

#Message viewsets
class MessageViewSet(viewsets.ModelViewSet):
    queryset=Message.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MessageSerializer