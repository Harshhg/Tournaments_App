from django.contrib import admin
from match.models import Matches, Rounds
from players.models import Players
from tournament.models import Tournaments
from login.models import Account
from django.utils.html import format_html

class PlayedByFilter(admin.SimpleListFilter):
    title = ('Players')
    parameter_name = 'player1_id'
    def lookups(self, request, model_admin):
        return (
            ('', ''),
        )
    def queryset(self, request, queryset):
        from django.db.models import Q
        id = request.GET.get('player1_id')
        if id:
            return Matches.objects.filter(Q(player1_id=id) | Q(player2_id=id))
        return queryset

class MatchAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        return False
    def player1(self, obj):
        queryset = Players.objects.get(id=obj.player1_id)
        return queryset.name.title()

    def player2(self, obj):
        queryset = Players.objects.get(id=obj.player2_id)
        return queryset.name.title()

    def tournamentName(self, obj):
        queryset = Tournaments.objects.get(id=obj.tournament_id)
        return queryset.name

    def created_by(self, obj):
        tournamentQuerySet = Tournaments.objects.get(id=obj.tournament_id)
        queryset = Account.objects.get(id=tournamentQuerySet.user_id)
        return queryset.first_name.title() + " " + queryset.last_name.title()

    def matchStatus(self, obj):
        queryset = Matches.objects.get(id=obj.id)
        if queryset.is_completed:
            return "YES"
        return "NO"

    def winner(self, obj):
        winnerQueryset = Matches.objects.get(id=obj.id)
        queryset = Players.objects.get(id=winnerQueryset.winner_id)
        if queryset.name:
            return format_html("<b>{}</b>", queryset.name.title())
        return ""

    def getRound(self, obj):
        matchQuerySet = Matches.objects.get(id=obj.id)
        currentRound = matchQuerySet.round_no
        totalRounds = Rounds.objects.filter(tournament_id=obj.tournament_id).count()
        if currentRound == totalRounds-1:
            return "SemiFinal"
        if currentRound == totalRounds:
            return "Final"
        return "Round "+ str(currentRound)

    tournamentName.short_description = "Tournament"
    player1.short_description = "Player 1"
    player2.short_description = "Player 2"
    created_by.short_description = "Created By"
    matchStatus.short_description = "Completed"
    getRound.short_description = "Round No"
    search_fields = ['tournament__name']
    list_display = ('tournamentName', 'player1',  'player2', 'matchStatus',
                    'winner', 'getRound', 'created_by')
    list_filter =  ('is_completed','round_no',PlayedByFilter)

admin.site.register(Matches, MatchAdmin)

