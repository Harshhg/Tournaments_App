from django import forms
from django.conf.urls import url
from django.utils.safestring import mark_safe
from .views import TournamentDraws
from .models import Tournaments
from django.contrib import admin
from players.models import Players
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html
from match.models import Matches
import csv
from autocompletefilter.admin import AutocompleteFilterMixin
from match.serializers import MatchSerializer, RoundSerializer
from autocompletefilter.filters import AutocompleteListFilter

from django_select2 import forms as s2forms

# class MyFilter(AutocompleteFilter):
#     title = 'Artist' # display title
#     field_name = 'players' # name of the foreign key field
#



# class CategoryChoices(AutoModelSelect2Field):
#     queryset = models.Category.objects
#     search_fields = ['name__icontains', 'code__icontains']

class ByTournamentStatus(admin.SimpleListFilter):
    title = ('Status')
    parameter_name = 'status'
    template = 'admin/case_custom_filter.html'

    def lookups(self, request, model_admin):
        return (
            ('upcoming', ('Upcoming')),
            ('ongoing', ('Ongoing')),
            ('previous', ('Previous')),
        )
    def queryset(self, request, queryset):
        from django.utils import timezone
        current_time = timezone.now()
        if self.value() == 'upcoming':
            return Tournaments.objects.filter(start_date__gt=current_time, is_completed=False)
        elif self.value() == 'ongoing':
            return Tournaments.objects.filter(start_date__lte=current_time, is_completed=False)
        elif self.value() == 'previous':
            return Tournaments.objects.filter(is_completed=True)
        else:
            return queryset


class MyTournamentAdminForm(forms.ModelForm):
    def clean(self):
        try:
            totalPlayers = self.cleaned_data['total_players']
            playersSelected =  self.cleaned_data['players'].count()

            if(totalPlayers != playersSelected):
                self.add_error('players', "Player should be equal to Total Players")

            if(self.cleaned_data['user'] is None):
                self.add_error('user', "Please Select User")
        except Exception as e:
            pass

        class Meta:
            model = Tournaments


class TournamentsAdmin(AutocompleteFilterMixin, admin.ModelAdmin):
    form = MyTournamentAdminForm

    def get_rounds(self, total_players):
        rounds = {
            2 : 1,   4 : 2,   8 : 3,   16 : 4,   32 : 5,   64 : 6,   128 : 7,   256 : 8,   512 : 9,   1024 : 10
        }
        return rounds[total_players]

    def generate_draws(self, request, tournament_id):                 # API - generateDraws/
        try:
            print("ALLELLEELFD", tournament_id)

            tournament_queryset = Tournaments.objects.get(id=tournament_id)

            # ------  Generate match -------- #
            all_players = tournament_queryset.players.all()
            players_added = tournament_queryset.players.all().count()
            total_players = tournament_queryset.total_players
            players_needed = total_players - players_added

            # -------- Generate Draws ----------- #

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


        except Exception as e:
            print("EXCEPTIONNNNNNNN", str(e))


        self.message_user(request, 'Draws Generated Successfully !!')
        url = reverse(
            'admin:tournament_tournaments_changelist',
            current_app=self.admin_site.name,
        )
        return HttpResponseRedirect(url)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            url(
                r'^(?P<tournament_id>.+)$',
                self.admin_site.admin_view(self.generate_draws),
                name='generate-draws',
            ),
        ]
        return urls + custom_urls
    def button(self, obj):
        tournamentQuerySet = Tournaments.objects.get(id=obj.id)
        players_added = tournamentQuerySet.players.all().count()
        total_players = tournamentQuerySet.total_players

        if tournamentQuerySet.is_match_created == False:
            if players_added != total_players:
                return format_html(
                    '<p style="color:red">Insufficient players !</p>',
                )
            return format_html(
                '<a class="button" style="display:inline-block;padding:0.1em 0.5em;margin:0 0.1em 0.1em 0;border-radius:0.2em;box-sizing: border-box;text-decoration:none; ,sans-serif;font-weight:400;font-size:14px;color:#FFFFFF;background-color:#3369ff; text-align:center" href="{}">Generate Draws</a>',
                reverse('admin:generate-draws', args=[obj.id]),
            )
        else:
            return format_html(
                '<p style="color:green">Generated !</p>',
            )
    button.short_description = 'Draws'
    button.allow_tags = True

    def winner(self, obj):
        try:
            playerQuerySet = Players.objects.get(id=obj.winner_id)
            return format_html("<b>{}</b>", playerQuerySet.name.title())
        except:
            return "-"

    search_fields = ['name']
    list_display = ('name','start_date','total_players', 'max_score', 'is_completed','is_match_created',
                     'view_match_link', 'winner', 'button')
    list_filter = (ByTournamentStatus, 'start_date', 'is_completed', 'is_match_created',)
    actions = ["export_as_csv"]
    list_per_page = 25
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])
        return response

    def view_match_link(self, obj):
        count = Matches.objects.filter(tournament_id=obj.id).count()
        url = (
                reverse("admin:match_matches_changelist")
                + "?"
                + urlencode({"tournament_id": f"{obj.id}"})
        )
        return format_html('<a href="{}">{} Matches</a>', url, count)

    view_match_link.short_description = "View Matches"
    export_as_csv.short_description = "Export Selected"
    change_form_template = 'admin/otp_change_form.html'

admin.site.site_header = "Tournaments App"
admin.site.register(Tournaments, TournamentsAdmin)

