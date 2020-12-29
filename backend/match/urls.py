
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from .views import MatchScore

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('match/score/update/', MatchScore.as_view({'post': 'update_score'})),
    path('match/score', MatchScore.as_view({'get': 'view_score'})),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', views.obtain_auth_token),
]
