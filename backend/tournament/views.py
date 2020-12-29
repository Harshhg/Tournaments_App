from django.shortcuts import render
from rest_framework.decorators import action
from .models import Tournaments
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status, viewsets
from . serializers import TournamentSerializer, TournamentListSerializer, TournamentMatchSerializer, TournamentDetailSerializer,TournamentPlayerListSerializer, PlayerListSerializer
from match.serializers import MatchSerializer, RoundSerializer
from players.models import Players
from rest_framework.response import Response
from django.utils import timezone

# Code By -  HARSH -------------#
class TournamentAddListView(viewsets.ModelViewSet):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = (IsAuthenticated,AllowAny)
    players = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]

    def get_permissions(self):
        print(self.action)
        guest = ['tournament_list', 'ongoing_tournament', 'upcoming_tournament', 'previous_tournament', 'view_matches']
        if self.action in guest:
            self.permission_classes = [AllowAny,]
        else:
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()

    # get method to list all tournaments
    @action(detail=True, methods=['get'], permission_classes=[AllowAny])
    def tournament_list(self,request):                      # API  -  tournament
        response={}
        try:
            id = request.GET.get('id')
            if id:                          # To get more details about the tournament
                if request.user.id is None:
                    queryset = Tournaments.objects.filter(id=id)
                    serializer = TournamentDetailSerializer(queryset, context={"request": request}, many=True)
                else:
                    queryset = Tournaments.objects.filter(user=request.user, id=id)
                    serializer = TournamentDetailSerializer(queryset,context={"request": request}, many=True)
            else:
                if request.user.id is None:
                    queryset = Tournaments.objects.all()
                    serializer = TournamentListSerializer(queryset,context={"request": request},  many=True)
                else:
                    queryset = Tournaments.objects.filter(user=request.user)
                    serializer = TournamentListSerializer(queryset,context={"request": request}, many=True)

            # queryset = Tournaments.objects.all()
            # serializer = TournamentListSerializer(queryset, many=True)
            response['data'] = serializer.data
            response['message'] = 'Successfull'
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 0
            response['exception_status'] = 0
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)


    # to add new tournaments
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def tournament_add(self,request):                       # API  -  add/tournament/
        response = {}
        try:
            totalPlayers = request.data.get('total_players')
            print(totalPlayers)
            if totalPlayers is None:
                response['data'] = ''
                response['message'] = "Please provide Total Players"
                response['status'] = status.HTTP_201_CREATED
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
            if int(totalPlayers) not in self.players:
                response['data'] = ''
                response['message'] = 'Total Players should be in ' + str(self.players)
                response['status'] = status.HTTP_201_CREATED
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
            serializer = TournamentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)  # adding foreign key data
                serializer.save()
                response['data'] = ''
                response['message'] = 'Tournament Successfully Created !'
                response['status'] = status.HTTP_201_CREATED
                response['error_status'] = 0
                response['exception_status'] = 0
            else:
                response['data'] = ''
                response['message'] = serializer.errors
                response['status'] = status.HTTP_201_CREATED
                response['error_status'] = 1
                response['exception_status'] = 0
            return Response(response)
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)

# Code by - PRAVEEN ------ #
# get list of all ongoing tournaments (get request)
    @action(detail=True, methods=['get'],  permission_classes=[AllowAny])
    def ongoing_tournament(self, request):              # API -  tournament/ongoing
        response = {}
        try:
            current_time = timezone.now()
            if request.user.id is None:
                queryset = Tournaments.objects.filter(start_date__lte=current_time,
                                                      is_completed=False)
            else:
                queryset = Tournaments.objects.filter(user=request.user, start_date__lte=current_time, is_completed=False)
            # queryset = Players.objects.filter(user = request.user,name__contains = name)
            # queryset = Players.objects.all()
            serializer = TournamentListSerializer(queryset,context={"request": request}, many=True)
            response["data"] = serializer.data
            response['message'] = 'Successful '
            response["status"] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 1
            response['exception_status'] = 1
        return Response(response)

    # get list of all upcoming tournaments (get request)
    @action(detail=True, methods=['get'],  permission_classes=[AllowAny])
    def upcoming_tournament(self, request, pk=None):        # API -  tournament/upcoming
        response = {}
        try:
            current_time = timezone.now()
            if request.user.id is None:
                queryset = Tournaments.objects.filter(start_date__gt=current_time,
                                                      is_completed=False)
            else:
                queryset = Tournaments.objects.filter(user=request.user, start_date__gt=current_time, is_completed=False)
            serializer = TournamentListSerializer(queryset,context={"request": request}, many=True)
            response["data"] = serializer.data
            response['message'] = 'Successful'
            response["status"] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)

    # get list of all previous tournaments (get request)
    @action(detail=True, methods=['get'],  permission_classes=[AllowAny])
    def previous_tournament(self, request, pk=None):        # API - tournament/previous
        response = {}
        try:
            current_time = timezone.now()
            if request.user.id is None:
                queryset = Tournaments.objects.filter(is_completed=True)
            else:
                queryset = Tournaments.objects.filter(user=request.user, is_completed=True)
            serializer = TournamentListSerializer(queryset, context={"request": request},many=True)
            response["data"] = serializer.data
            response['message'] = 'Successful '
            response["status"] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)




# To add players to the tournaments
class TournamentAddDeletePlayers(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    # To view players in current tournaments

    # Code by --- PRAVEEN ------#
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def search_player(self, request):  # API  -     tournament/player
        response = {}
        try:
            name = request.GET.get('search')
            tournament_id = request.GET.get('tournament_id')
            if not name or not tournament_id:
                response['data'] = ''
                response['message'] = 'Please provide search and tournament_id parameter both'
                response['status'] = status.HTTP_204_NO_CONTENT
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
            queryset = Players.objects.filter(user_id=request.user.id, name__icontains=name)
            # print(queryset)
            serializer = TournamentPlayerListSerializer(queryset, many=True, context={'request': request})
            if queryset:
                response['data'] = serializer.data
                response['message'] = 'Players search successful !'
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 0
                response['exception_status'] = 0
            else:
                response['data'] = ''
                response['message'] = 'No search result found'
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 1
                response['exception_status'] = 0
            return Response(response)

        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 1
            response['exception_status'] = 1
        return Response(response)

# Code by - HARSH ------#
    # add player to the tournament
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_player(self, request, pk=None):              # API  -     add/tournament/player/
        response = {}
        try:
            tournamentId = request.data.get('tournament_id')
            playerId = request.data.get('player_id')
            # if tournament id or player id is not given
            if not tournamentId or not playerId :
                response['data'] = ''
                response['message'] = 'Please provide tournament_id and player_id both.'
                response['status'] = status.HTTP_204_NO_CONTENT
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)

            tournamentQuerySet = Tournaments.objects.get(user=request.user,id=tournamentId)
            players_added = tournamentQuerySet.players.all().count()
            total_players = tournamentQuerySet.total_players

            # If maximum players are added, don't add any more players
            if players_added < total_players:
                checkAlreadyAdded = tournamentQuerySet.players.filter(id=playerId).exists()
                if checkAlreadyAdded:
                    response['data'] = ''
                    response['message'] = "This Player has already been added"
                    response['status'] = status.HTTP_201_CREATED
                    response['error_status'] = 1
                    response['exception_status'] = 0
                else:
                    tournamentQuerySet.players.add(playerId)    # mapping to many to many table
                    response['data'] = ''
                    response['message'] = 'Player added successfully !'
                    response['status'] = status.HTTP_201_CREATED
                    response['error_status'] = 0
                    response['exception_status'] = 0
            else:
                response['data'] = ''
                response['message'] = 'You have already added maximum players !'
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 1
                response['exception_status'] = 0
            return Response(response)

        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 1
            response['exception_status'] = 1
        return Response(response)

#  Code By  -  PRAVEEN  #
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def delete_player(self, request):          # API  -     delete/tournament/player/
        response = {}
        try:
            # variable names
            playerId = request.data.get('player_id')
            tournamentId = request.data.get('tournament_id')

            # add - validation to check if both params are provided, without it code is working, and giving response
            if not tournamentId or not playerId:
                response['data'] = ''
                response['message'] = 'Please provide tournament_id and player_id both.'
                response['status'] = status.HTTP_204_NO_CONTENT
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
            #  ----- add

            tqueryset = Tournaments.objects.get(id=tournamentId)
            tqueryset.players.remove(playerId)
            response["data"] = ''
            response['message'] = 'Player removed successfully '
            response["status"] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
            return Response(response)
        # pid.players.delete()
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0   # no error only exception
            response['exception_status'] = 1
            return Response(response)

# Code by - HARSH -----#
# class to generate draws for the players added
class TournamentDraws(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    response={}
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def generate_draws(self, request):                 # API - generateDraws/
        try:
            tournament_id = request.data.get('tournament_id')
            if not tournament_id :
                self.response['data'] = ''
                self.response['message'] = 'Please provide tournament_id.'
                self.response['status'] = status.HTTP_204_NO_CONTENT
                self.response['error_status'] = 1
                self.response['exception_status'] = 0
                return Response(self.response)

            tournament_queryset = Tournaments.objects.get(id=tournament_id)

            # if match is already generated return
            if tournament_queryset.is_match_created == True:
                self.response['data'] = ''
                self.response['message'] = "Draws Already Generated !"
                self.response['status'] = status.HTTP_200_OK
                self.response['error_status'] = 1
                self.response['exception_status'] = 0
                return Response(self.response)

            # ------  Generate match -------- #
            all_players = tournament_queryset.players.all()
            players_added = tournament_queryset.players.all().count()
            total_players = tournament_queryset.total_players
            players_needed = total_players - players_added

            # -------- if required players are not added in the tournaments ------- #
            if total_players != players_added:
                self.response['data'] = {
                    'total_players': total_players,
                    'players_added': players_added,
                    'players_needed': players_needed,
                    'start_tournament': True if not total_players - players_added else False
                }
                self.response['message'] = str(players_needed) + ' more players needed to start tournament!'
                self.response['status'] = status.HTTP_200_OK
                self.response['error_status'] = 1
                self.response['exception_status'] = 0
                return Response(self.response)

            # -------- Generate Draws ----------- #
            else:
                # Fetching all added players list and sorting them by ID
                players_id = []
                for player in all_players:
                    players_id.append(player.id)
                players_id.sort()

                # -- Get total rounds -- #
                total_rounds = self.get_rounds(total_players)

                # ------  generate pairs of players in match table ( match fixing )   ------- #
                i=0
                while(i < total_players):
                    data = {
                        'player1_id' : players_id[i],
                        'player2_id' : players_id[i+1],
                        'winner_id' : None,
                        'round_no' : 1,
                        'is_completed' : False
                    }
                    i += 2
                    matchSerializer = MatchSerializer(data=data)
                    if matchSerializer.is_valid():
                        matchSerializer.save(tournament=tournament_queryset)
                    else:
                        print(matchSerializer.errors)

                # ------ Updating tournaments table, to set match created status  ------#
                tournament_queryset.is_match_created = True
                tournament_queryset.save()

                # --------  Updating rounds table to set matches/rounds/players/status ------#
                tempPlayers = total_players
                tempMatches = total_players/2
                for round in range(1,total_rounds+1):
                    data = {
                        'round_no': round,
                        'total_matches': tempMatches,
                        'total_players': tempPlayers,
                        'is_completed' : False,
                        'is_started' : True if round==1 else False
                    }
                    tempPlayers /= 2
                    tempMatches = tempPlayers / 2

                    roundSerializer = RoundSerializer(data=data)
                    if roundSerializer.is_valid():
                        roundSerializer.save(tournament=tournament_queryset)
                    else:
                        print(roundSerializer.errors)

                # ------ sending response -------------  #
                self.response['data'] = ''
                self.response['message'] = "Matched Generated Successfully !"
                self.response['status'] = status.HTTP_201_CREATED
                self.response['error_status'] = 0
                self.response['exception_status'] = 0

        except Exception as e:
            self.response['data'] = ''
            self.response['message'] = str(e)
            self.response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            self.response['error_status'] = 1
            self.response['exception_status'] = 1
        return Response(self.response)

    # ----- return no of rounds given total players , (players:rounds)
    def get_rounds(self, total_players):
        rounds = {
            2 : 1,   4 : 2,   8 : 3,   16 : 4,   32 : 5,   64 : 6,   128 : 7,   256 : 8,   512 : 9,   1024 : 10
        }
        return rounds[total_players]


# to view Matches/Fixtures of tournaments
class TournamentViewMatches(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == 'view_matches':
            self.permission_classes = [AllowAny, ]
        return super().get_permissions()

    @action(detail=True, methods=['get'], permission_classes=[AllowAny])
    def view_matches(self, request, pk=None):                   # API - tournament/matches/
        response = {}
        try:
            id = request.GET['tournament_id']
            queryset = Tournaments.objects.get(id=id)
            serializer = TournamentMatchSerializer(queryset)       # All processing is done inside this serializer
            response['data'] = serializer.data
            response['message'] = 'Successfull'
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 0
            response['exception_status'] = 0
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)

#  Code by - PRAVEEN --- ####
class TournamentCloneDelete(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    # delete tournament with all the added players (post request)
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def delete_tournament(self, request):               # API - tournament/delete/
        response = {}
        try:
            tournamentId = request.data.get('tournament_id')
            playerId = Players.objects.values_list('id')
            queryset = Tournaments.objects.get(id=tournamentId)
            if not tournamentId:
                response['data'] = ''
                response['message'] = 'Please provide tournament_id'
                response['status'] = status.HTTP_204_NO_CONTENT
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
            for p in playerId:
                queryset.players.remove(p)
            queryset.delete()
            response["data"] = ''
            response['message'] = 'tournament removed successfully '
            response["status"] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
            return Response(response)
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 1
            response['exception_status'] = 1
            return Response(response)


    # clone tournament with all the added players (post request)
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def clone_tournament(self, request, pk=None):               # API  - tournament/clone
        response = {}
        try:
            tournamentId = request.data.get('tournament_id')
            if not tournamentId:
                response['data'] = ''
                response['message'] = 'Please provide tournament_id '
                response['status'] = status.HTTP_204_NO_CONTENT
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
            queryset = Tournaments.objects.get(user=request.user,pk=tournamentId)
            player_id = queryset.players.all()
            queryset.pk = None
            queryset.name = queryset.name + 'copy'
            queryset.is_match_created = False
            queryset.is_completed = False
            queryset.winner_id = None
            queryset.save()
            new_tournament_id = queryset.pk
            new_tournament_queryset = Tournaments.objects.get(user=request.user,id=new_tournament_id)
            for i in player_id:
                new_tournament_queryset.players.add(i)
            serializer = TournamentListSerializer(new_tournament_queryset,context={"request": request})
            response['data'] = serializer.data
            response['message'] = 'tournament cloned successfully '
            response["status"] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
            return Response(response)
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 1
            response['exception_status'] = 1
            return Response(response)

    # made changes in cloned tournament if required (put request)
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def update_tournament(self, request, pk=None):
        response = {}
        try:
            tournament_id = request.GET.get('id')
            tournament_detail = Tournaments.objects.get(pk=tournament_id)
            serializer = TournamentSerializer(tournament_detail, data=request.data, partial=True)
            if not serializer.is_valid():
                response['data'] = ''
                response['message'] = serializer.errors
                response['status'] = status.HTTP_201_CREATED
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
            serializer.save()
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 1
            response['exception_status'] = 1
            return Response(e)
        response['data'] = ''
        response['message'] = 'Success'
        response['status'] = status.HTTP_201_CREATED
        response['error_status'] = 0
        response['exception_status'] = 0
        return Response(response)