from django.db import models

class Tournaments(models.Model):
    name = models.CharField(max_length=100, default=None, null=False)
    start_date = models.DateField(default=None, null=False)
    end_date = models.DateField(default=None, null=True, blank=True)
    max_score = models.IntegerField(default=None, null=False)
    is_match_created = models.BooleanField(verbose_name='Match Created', default=False, null=True)
    is_completed = models.BooleanField(verbose_name='Completed', default=False)
    winner_id = models.IntegerField(verbose_name='winner',default=None, null=True, blank=True)
    total_players = models.IntegerField(default=None, null=False)
    user = models.ForeignKey('login.Account', on_delete=models.DO_NOTHING, blank=True)
    tournament_image = models.ImageField(upload_to='media/tournaments/', default=None, null=True)
    players = models.ManyToManyField('players.Players', related_name='player')

    # def __str__(self):
    #     return self.name

    class Meta:
        verbose_name_plural = "Tournaments"



