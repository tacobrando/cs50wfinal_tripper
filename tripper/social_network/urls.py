from rest_framework import routers
from .api import UserViewSet, PostViewSet, ProfileViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register('users', UserViewSet, 'users')
router.register(r'posts', PostViewSet, 'posts')
router.register('profiles', ProfileViewSet, 'profiles')

urlpatterns = router.urls
