from rest_framework import routers
from .api import UserViewSet, PostViewSet, ReplyViewSet, ProfileViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet, 'users')
router.register('posts', PostViewSet, 'posts')
router.register('replies', ReplyViewSet, 'replies')
router.register('profiles', ProfileViewSet, 'profiles')

urlpatterns = router.urls
