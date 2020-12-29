from rest_framework import serializers
from .models import Players
from match.models import Matches
from tournament.models import Tournaments
from tournament.serializers import TournamentListSerializer
from tournament_app.settings import serverURL

class PlayerDetailSerializer(serializers.ModelSerializer):
    tournaments = serializers.SerializerMethodField()
    tournaments_played = serializers.SerializerMethodField()
    tournaments_won = serializers.SerializerMethodField()
    matches_played = serializers.SerializerMethodField()
    matches_won = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()
    class Meta:
        model = Players
        fields = ['id', 'name', 'email', 'gender', 'age', 'profile_image', 'tournaments_played', 'tournaments_won',
                  'matches_played', 'matches_won', 'tournaments']

    def get_profile_image(self,account):
        # request = self.context.get('request')
        if account.profile_image == "":  # if profile image is None
            return None
        else:
            profile_image = account.profile_image.url
            return serverURL + profile_image
        # if request:
        #     profile_image = account.profile_image.url
        #     return request.build_absolute_uri(profile_image)

    def get_tournaments(self, obj):
        queryset = Tournaments.objects.filter(players=obj.id)
        serializer = TournamentListSerializer(queryset, many=True)
        return serializer.data

    def get_tournaments_played(self, obj):
        tournamentsPlayed = Tournaments.objects.filter(players=obj.id).count()
        return tournamentsPlayed

    def get_tournaments_won(self, obj):
        tournamentsWon = Tournaments.objects.filter(winner_id=obj.id).count()
        return tournamentsWon

    def get_matches_played(self,obj):
        queryset1 = Matches.objects.filter(player1_id = obj.id).count()
        queryset2 = Matches.objects.filter(player2_id=obj.id).count()
        return queryset1 + queryset2

    def get_matches_won(self, obj):
        queryset = Matches.objects.filter(winner_id=obj.id).count()
        return queryset