from rest_framework import serializers
from .models import Score
from .models import Matches, Rounds

class ScoreUpdateSerializer(serializers.ModelSerializer):
    is_finished = 1
    class Meta:
        model = Score
        fields = ['match_id', 'set_no', 'player1_id', 'player2_id', 'player1_score', 'player2_score']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = ['player1_id', 'player2_id', 'winner_id', 'round_no', 'is_completed']

class RoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rounds
        fields = ['round_no', 'total_matches', 'total_players', 'is_completed', 'is_started']
