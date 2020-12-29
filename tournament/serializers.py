from rest_framework import serializers
from .models import Tournaments
from match.models import Matches, Rounds
from players.models import Players
from django.core.exceptions import ObjectDoesNotExist
from tournament_app.settings import serverURL
from django.utils import timezone
# from players.serializers import PlayerSerializer, PlayerListSerializer
class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = ['name', 'email', 'gender', 'age', 'profile_image']

class PlayerListSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = Players
        fields = ['id', 'name', 'email', 'gender', 'age', 'profile_image']

    def get_name(self,obj):
        return obj.name.title()

    def get_profile_image(self,account):
        if account.profile_image == "":     # if profile image is None
            return None
        else:
            profile_image = account.profile_image.url
            return serverURL + profile_image


class TournamentPlayerListSerializer(serializers.ModelSerializer):
    is_added = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()
    class Meta:
        model = Players
        fields = ['id', 'name', 'email', 'gender', 'age', 'profile_image', 'is_added']

    def get_profile_image(self,player):
        if player.profile_image == "":     # if profile image is None
            return None
        else:
            profile_image = player.profile_image.url
            return serverURL + profile_image

    def get_name(self,obj):
        return obj.name.title()

    def get_is_added(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, "GET"):
            tournament_id = request.GET.get('tournament_id')
        tournamentqueryset = Tournaments.objects.filter(id=tournament_id, players=obj.id).count()
        return True if tournamentqueryset else False

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournaments
        fields = ['name', 'start_date', 'end_date', 'max_score', 'total_players','tournament_image']

class TournamentListSerializer(serializers.ModelSerializer):
    tournament_image = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    is_started = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Tournaments
        fields = ['id', 'name', 'start_date', 'end_date', 'max_score', 'total_players',
                  'is_match_created', 'status', 'is_started', 'is_completed', 'winner_id','tournament_image']

    def get_status(self, obj):
        status = ""
        current_time = timezone.datetime.now().date()
        queryset = Tournaments.objects.get(id=obj.id)
        if queryset.start_date > current_time:
            status = "Upcoming"
        elif queryset.start_date <= current_time:
            status = "Ongoing"
        if queryset.is_completed:
            status = "Finished"
        return status

    def get_is_started(self,obj):
        current_time = timezone.datetime.now().date()
        queryset = Tournaments.objects.get(id=obj.id)
        if queryset.start_date > current_time:
            return False
        return True

    def get_name(self,obj):
        return obj.name.title()

    def get_tournament_image(self,account):
        if account.tournament_image == "":     # if profile image is None
            return None
        else:
            tournament_image = account.tournament_image.url
            return serverURL + tournament_image
        # if request:
        #     tournament_image = account.tournament_image.url
        #     return request.build_absolute_uri(tournament_image)

class TournamentDetailSerializer(serializers.ModelSerializer):
    players = serializers.SerializerMethodField()
    winner_details = serializers.SerializerMethodField()
    tournament_image = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    is_started = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Tournaments
        fields = ['id', 'name', 'start_date', 'end_date', 'max_score', 'total_players',
                  'is_match_created', 'status', 'is_started', 'is_completed','tournament_image',
                  'winner_details', 'players']

    def get_status(self, obj):
        status = ""
        current_time = timezone.datetime.now().date()
        queryset = Tournaments.objects.get(id=obj.id)
        if queryset.start_date > current_time:
            status = "Upcoming"
        elif queryset.start_date <= current_time:
            status = "Ongoing"
        if queryset.is_completed:
            status = "Finished"
        return status


    def get_is_started(self,obj):
        current_time = timezone.datetime.now().date()
        queryset = Tournaments.objects.get(id=obj.id)
        if queryset.start_date > current_time:
            return False
        return True

    def get_name(self,obj):
        return obj.name.title()

    def get_winner_details(self, obj):
        try:
            playerQuerySet = Players.objects.get(id=obj.winner_id)
            serializer = PlayerListSerializer(playerQuerySet)
            return serializer.data
        except ObjectDoesNotExist as e:
            return None

    def get_players(self, obj):
        playersqueryset = obj.players.all()
        serializer = PlayerListSerializer(playersqueryset, many=True)
        return serializer.data

    def get_tournament_image(self, account):
        if account.tournament_image == "":  # if profile image is None
            return None
        else:
            tournament_image = account.tournament_image.url
            return serverURL + tournament_image

class TournamentMatchSerializer(serializers.ModelSerializer):
    total_rounds = serializers.SerializerMethodField()
    rounds = serializers.SerializerMethodField()
    winner = serializers.SerializerMethodField('get_tournament_winner')
    name = serializers.SerializerMethodField()

    class Meta:
        model = Tournaments
        fields = ['id', 'name', 'start_date', 'end_date', 'total_players', 'total_rounds', 'is_match_created',
                  'is_completed', 'winner', 'rounds']

    def get_name(self,obj):
        return obj.name.title()

    def get_tournament_winner(self, obj):
        queryset = Tournaments.objects.get(id=obj.id)
        winnerId = queryset.winner_id
        winner = self.get_player_data(obj, winnerId)
        return winner


    def get_total_rounds(self, obj):
        totalRounds = Rounds.objects.filter(tournament=obj.id).count()
        return totalRounds


    def get_rounds(self, obj):
        totalRounds = Rounds.objects.filter(tournament=obj.id).count()
        roundsList = []
        for round in range(1, totalRounds-1):
            roundsList.append("Round " + str(round))
        roundsList.append('Semifinal Round')
        roundsList.append('Final Round')

        roundsData = self.get_rounds_data(obj, totalRounds, roundsList)
        return {'rounds_list' : roundsList, 'rounds_data': roundsData}


    def get_rounds_data(self, obj, totalRounds, roundsList):
        roundsData = []
        for round in range(1, totalRounds+1):
            roundNo = round
            roundName = roundsList[round-1]
            roundqueryset = Rounds.objects.get(tournament=obj.id, round_no=round)
            totalMatch = roundqueryset.total_matches
            totalPlayers = roundqueryset.total_players
            isStarted = roundqueryset.is_started
            isCompleted = roundqueryset.is_completed
            matchData = self.get_match_data(obj, totalMatch, round)
            roundsData.append({'round_no' : round, 'round_name' : roundName,  'is_started': isStarted, 'is_completed' : isCompleted,
                    'total_match' : totalMatch, 'total_players': totalPlayers, 'match_data' : matchData})

        # if len(roundsData) == 0:
        #     matchData = self.get_match_data(obj, 0, 0)
        #     roundsData.append(matchData)
        return roundsData


    def get_match_data(self, obj, totalMatch, roundNo):
        matchData = []
        matchqueryset = Matches.objects.filter(tournament=obj.id, round_no=roundNo)

        matchno = 1
        for match in matchqueryset:
            matchId = match.id
            matchNo = matchno
            isStarted = match.is_started
            matchno += 1
            player1 = self.get_player_data(obj,match.player1_id)
            player2 = self.get_player_data(obj,match.player2_id)
            winner = self.get_player_data(obj,match.winner_id)
            matchCompleted = match.is_completed
            matchData.append({'match_id' : matchId, 'match_no' : matchNo, 'is_completed':matchCompleted,
                              'is_started' : isStarted,'player1' : player1, 'player2' : player2, 'winner': winner})

        # For empty match, appending empty data
        for i in range(len(matchData), totalMatch):
            playerEmptyData = {'id': '', 'name': '', 'email': '', 'gender': '', 'age': '', 'profile_image': ''}
            matchData.append({'match_id': '', 'match_no': '', 'is_completed': '',
                              'is_started': '', 'player1': playerEmptyData, 'player2': playerEmptyData,
                              'winner': playerEmptyData})

        return matchData


    def get_player_data(self, obj,playerId):
        try:
            # request = self.context.get('request')
            playerqueryset = Players.objects.get(id=playerId)
            serializer = PlayerListSerializer(playerqueryset)
            return serializer.data

        except Exception as e:
            playerEmptyData = {'id': '', 'name': '', 'email': '', 'gender': '', 'age': '', 'profile_image': ''}
            return playerEmptyData

