from django.contrib import admin
from .models import Players
from login.models import Account
from tournament.models import Tournaments
from django.urls import reverse
from django.utils.html import format_html
from match.models import Matches
# Register your models here.

class PlayersAdmin(admin.ModelAdmin):
    def created_by(self, obj):
        queryset = Account.objects.get(id=obj.user_id)
        return queryset.first_name.title() + " " + queryset.last_name.title()

    def played_in_tournaments(self, obj):
        tournamentsPlayed = Tournaments.objects.filter(players=obj.id)
        url = (
                reverse("admin:tournament_tournaments_changelist")
                    + "?players={}".format(obj.id)
        )
        return format_html('<a href="{}">{} Tournaments</a>', url, tournamentsPlayed.count())

    def played_in_matches(self, obj):
        queryset1 = Matches.objects.filter(player1_id=obj.id).count()
        queryset2 = Matches.objects.filter(player2_id=obj.id).count()
        matchesPlayed =  queryset1 + queryset2
        url = (
                reverse("admin:match_matches_changelist")
                 + "?player1_id={}".format(obj.id)
        )
        return format_html('<a href="{}">{} Matches</a>', url, matchesPlayed)

    def tournaments_won(self, obj):
        tournamentsWon = Tournaments.objects.filter(winner_id=obj.id).count()
        return tournamentsWon

    def matches_won(self, obj):
        matchesWon = Matches.objects.filter(winner_id=obj.id).count()
        return matchesWon

    played_in_tournaments.short_description = "Tournaments"
    played_in_matches.short_description = "Matches"
    tournaments_won.short_description = "Won"
    matches_won.short_description = "Won"
    search_fields = ['name']
    list_display = ('name','email','gender','age', 'created_by', 'played_in_tournaments', 'tournaments_won',
                    'played_in_matches', 'matches_won',)
    list_filter = ('gender', )

admin.site.register(Players,PlayersAdmin)