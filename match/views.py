from rest_framework.decorators import action
from tournament.models import Tournaments
from .serializers import MatchSerializer
from .models import Rounds, Score, Matches
from .serializers import ScoreUpdateSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status, viewsets
from rest_framework.response import Response

#   This class will do the actual processing of matches, rounds, players score

class MatchScore(viewsets.ViewSet):

    def get_permissions(self):
        if self.action == 'view_score':
            self.permission_classes = [AllowAny,]
        else:
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()

    @action(detail=True, methods=['get'], permission_classes=[AllowAny])
    def view_score(self, request):
        response = {}
        matchId = request.GET.get('match_id')
        if matchId is None:
            response['data'] = ''
            response['message'] = 'Please send match_id as parameter !'
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 1
            response['exception_status'] = 0
            return Response(response)
        try:
            scoreQuerySet = Score.objects.filter(match_id=matchId)
            print(scoreQuerySet)
            serializer = ScoreUpdateSerializer(scoreQuerySet,many=True)
            response['data'] = serializer.data
            response['message'] = 'success'
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

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    # To update score, create rounds, getting winner
    def update_score(self,request):
        response = {}
        try:
            # checkInput = ScoreUpdateSerializer(data=request.data)
            # if checkInput.is_valid():
            match_id = request.data.get('match_id')
            if not match_id:
                raise Exception("Please provide Match ID")
            matchqueryset = Matches.objects.get(id=match_id)
            currentRoundNo = matchqueryset.round_no
            tournamentId = matchqueryset.tournament.id
            tournamentqueryset = Tournaments.objects.get(id=tournamentId)
            checkSetEntry = Score.objects.filter(match=match_id, set_no=request.data.get('set_no')).count()

            # if current set entry is already updated in the score table
            if checkSetEntry > 0:
                response['data'] = ''
                response['message'] = 'Current Set is already finished'
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)

            # ---------  update score table ------- #
            print("UPDATING SCORE TABLE")
            serializer = ScoreUpdateSerializer(data=request.data)
            print(serializer.initial_data)
            if serializer.is_valid():
                serializer.validated_data['is_finished'] = 1   # setting set completed status to True
                serializer.validated_data['match_id'] = match_id
                serializer.save()
                response['data'] = ''
                response['message'] = 'Score Updated Successfully'
                response['status'] = status.HTTP_201_CREATED
                response['error_status'] = 0
                response['exception_status'] = 0
            else:
                response['data'] = ''
                response['message'] = serializer.errors
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 0
                response['exception_status'] = 1

             # ------- if all sets are completed, the current match is finished, update match table with winner  ------- #
            checkCompletedSets = Score.objects.filter(match=match_id, is_finished=True).count()

            if checkCompletedSets == 3 :
                print("ALL SETS ARE COMPLETED IN CURRENT MATCH")
                roundqueryset = Rounds.objects.get(tournament=tournamentqueryset, round_no=currentRoundNo)
                totalMatches = roundqueryset.total_matches
                totalRounds = Rounds.objects.filter(tournament=tournamentqueryset).count()

                winnerId = self.get_winner(match_id)        # Get winner id

                # -------- update match table to set winner and match status ------- #
                print("UPDATING MATCH TABLE, SETTING WINNER")
                matchqueryset.winner_id = winnerId
                matchqueryset.is_completed = True
                matchqueryset.save()

                # ------- check if all matches are completed to start next round  ---------- #
                completedMatch = Matches.objects.filter(tournament=tournamentqueryset, round_no=currentRoundNo,
                                                        is_completed = True).count()

                # ------ all match of current round are completed, start next round, update round table ----- #
                if completedMatch == totalMatches:
                    print("ALL MATCHES ARE COMPLETE OF CURRENT ROUND")
                    currentRoundqueryset = Rounds.objects.get(tournament=tournamentqueryset, round_no=currentRoundNo)
                    currentRoundqueryset.is_completed = True
                    currentRoundqueryset.save()

                    # ----- update/start next round started status ----- #
                    if currentRoundNo != totalRounds:
                        nextRoundqueryset = Rounds.objects.get(tournament=tournamentqueryset, round_no=currentRoundNo+1)
                        nextRoundqueryset.is_started = True
                        nextRoundqueryset.save()
                        print("NEXT ROUND STATUS UPDATED")


                # ----------- move the winner player to next round / fix next match of next round  -------#
                if currentRoundNo < totalRounds:
                    print("MOVING WINNER TO NEXT ROUND")
                    nextRoundData = Matches.objects.filter(tournament=tournamentqueryset,
                                                            round_no=currentRoundNo+1, player2_id=None).count()

                    # ----- if no player is there is next match make winner as player 1 ----- #
                    if nextRoundData == 0:
                        print("No player found, creating next round match")
                        data = {
                            'player1_id': winnerId,
                            'player2_id': None,
                            'winner_id': None,
                            'round_no': currentRoundNo+1,
                            'is_completed': False
                        }
                        matchSerializer = MatchSerializer(data=data)
                        if matchSerializer.is_valid():
                            matchSerializer.save(tournament=tournamentqueryset)
                        else:
                            print(matchSerializer.errors)

                    # ----- if a player is there is next match make winner as player 2 ----- #
                    else:
                        print("MOVING WINNER - MATCH FIXED WITH PLAYER")
                        nextRoundData = Matches.objects.get(tournament=tournamentqueryset,
                                                                round_no=currentRoundNo + 1, player2_id=None)
                        nextRoundData.player2_id = winnerId
                        nextRoundData.save()

                # ------- This is the final round, update tournament table, and winner of tournament  ------ #
                else:
                    print("FINAL ROUND, UPDATING TOURNAMENT TABLE")
                    tournamentqueryset.is_completed = True
                    tournamentqueryset.winner_id = winnerId
                    tournamentqueryset.save()


        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)


    # Get winner id from score table, by player scores in all sets
    def get_winner(self, matchId):
        scorequeryset = Score.objects.filter(match=matchId)
        player1Score = 0
        player2Score = 0
        for scores in scorequeryset:
            if scores.player1_score > scores.player2_score:
                player1Score += 1
            else:
                player2Score += 1

        winnerId = scores.player1_id if player1Score > player2Score else scores.player2_id
        return winnerId