from django.contrib import admin
from .models import Account, OTPConfiguration
from django.contrib import admin
from tournament.models import Tournaments
from players.models import Players
from django.urls import reverse
from django.utils.html import format_html

class userAdmin(admin.ModelAdmin):
    model = Account
    def name(self, obj):
        return obj.first_name + " "+ obj.last_name

    def tournaments_created(self,obj):
        tournamentsCreated = Tournaments.objects.filter(user_id=obj.id).count()
        url = (
                reverse("admin:tournament_tournaments_changelist")
                + "?user_id={}".format(obj.id)
        )
        return format_html('<a href="{}">{} Tournaments</a>', url, tournamentsCreated)

    def players_created(self, obj):
        playersCreated = Players.objects.filter(user_id=obj.id).count()
        url = (
                reverse("admin:players_players_changelist")
                + "?user_id={}".format(obj.id)
        )
        return format_html('<a href="{}">{} Players</a>', url, playersCreated)

    tournaments_created.short_description = "Tournaments"
    players_created.short_description = "Players"
    search_fields = ['first_name']
    list_display = ('name', 'email', 'age', 'gender', 'is_superuser', 'tournaments_created',
                    'players_created')
    list_filter = ( 'age', 'gender', 'is_superuser', 'is_staff')


class OTPAdmin(admin.ModelAdmin):
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if obj.otp_type == 2:
            kwargs['choices'] = (
                ('accepted', 'Accepted'),
                ('denied', 'Denied'),
            )
        return form



    model = OTPConfiguration
    def has_add_permission(self, request, obj=None):
        return False
    def otp_type(self):
        otpQuerySet = OTPConfiguration.objects.all()[0]
        otpType = ""
        if otpQuerySet.otp_type == 0:
            otpType = "Numeric"

        if otpQuerySet.otp_type == 1:
            otpType = "Alpha Numeric (Lower+UpperCase)"

        if otpQuerySet.otp_type == 2:
            otpType = "Alpha Numeric (LowerCase)"

        if otpQuerySet.otp_type == 3:
            otpType = "Alpha Numeric (UpperCase)"
        return otpType

    def otp_expire_time(self):
        otpQuerySet = OTPConfiguration.objects.all()[0]
        return str(otpQuerySet.otp_expire_time) + " minutes"

    otp_type.short_description = "OTP TYPE"
    list_display = (otp_type,'otp_length',  otp_expire_time)
    change_form_template = 'admin/otp_change_form.html'

admin.site.register(Account, userAdmin)
admin.site.register(OTPConfiguration, OTPAdmin)
