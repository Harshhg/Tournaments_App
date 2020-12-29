from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from .views import PlayerViewSet

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('players', PlayerViewSet.as_view({'get': 'get_players'})),
    path('players/add/', PlayerViewSet.as_view({'post': 'add_players'})),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', views.obtain_auth_token),
]
