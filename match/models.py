from django.db import models
from tournament.models import Tournaments
# Create your models here.

class Matches(models.Model):

    tournament = models.ForeignKey(Tournaments, on_delete=models.DO_NOTHING, blank=True)
    player1_id = models.IntegerField(default=None, null=True)
    player2_id = models.IntegerField(default=None, null=True)
    winner_id = models.IntegerField(default=None, null=True, blank=True)
    round_no = models.IntegerField(default=None, null=True)
    is_completed = models.BooleanField(verbose_name="Completed", default=False, null=True)
    is_started = models.BooleanField(default=False, null=True)

    class Meta:
        verbose_name_plural = "Matches"


class Rounds(models.Model):
    tournament = models.ForeignKey(Tournaments, on_delete=models.DO_NOTHING, blank=True)
    round_no = models.IntegerField(default=None, null=False)
    total_matches = models.IntegerField(default=None, null=False)
    total_players = models.IntegerField(default=None, null=False)
    # round_status = models.CharField(max_length=50, default='not started', null=False)
    is_started = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)

class Score(models.Model):
    match = models.ForeignKey(Matches, on_delete=models.DO_NOTHING, blank=True)
    set_no = models.IntegerField(default=None, null=False)
    is_finished = models.BooleanField(default=False, null=False, blank=False)
    player1_id = models.IntegerField(default=None, null=False)
    player2_id = models.IntegerField(default=None, null=False)
    player1_score = models.IntegerField(default=0, null=False)
    player2_score = models.IntegerField(default=0, null=False)

