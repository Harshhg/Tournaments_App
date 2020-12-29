from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from .views import TournamentAddListView, TournamentAddDeletePlayers, TournamentDraws, TournamentViewMatches, TournamentCloneDelete

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('tournaments', TournamentAddListView.as_view({'get': 'tournament_list'})),
    path('tournament/add/', TournamentAddListView.as_view({'post': 'tournament_add'})),
    path('tournament/player',TournamentAddDeletePlayers.as_view({'get':'search_player'})),
    path('tournament/player/add/', TournamentAddDeletePlayers.as_view({'post': 'add_player'})),
    path('tournament/player/delete/', TournamentAddDeletePlayers.as_view({'post': 'delete_player'})),
    path('tournament/generateDraws/', TournamentDraws.as_view({'post': 'generate_draws'})),
    path('tournament/matches/', TournamentViewMatches.as_view({'get': 'view_matches'})),
    path('tournament/ongoing/', TournamentAddListView.as_view({'get': 'ongoing_tournament'})),
    path('tournament/upcoming/', TournamentAddListView.as_view({'get': 'upcoming_tournament'})),
    path('tournament/previous/', TournamentAddListView.as_view({'get': 'previous_tournament'})),
    path('tournament/delete/', TournamentCloneDelete.as_view({'post': 'delete_tournament'})),
    path('tournament/clone/', TournamentCloneDelete.as_view({'post': 'clone_tournament'})),
    path('tournament/update/', TournamentCloneDelete.as_view({'post': 'update_tournament'})),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', views.obtain_auth_token),
]
