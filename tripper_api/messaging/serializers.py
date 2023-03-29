from rest_framework import serializers
from messaging.models import Conversation, Message
from social_network.serializers import UserSerializer

#Conversation Serializer
class ConversationSerializer(serializers.ModelSerializer):
    participants=UserSerializer(many=True, read_only=True)
    class Meta:
        model=Conversation
        fields='__all__'

#Message Serializer
class MessageSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    conversation=ConversationSerializer()
    class Meta:
        model=Message
        fields='__all__'