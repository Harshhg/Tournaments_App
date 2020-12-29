from tournament.models import Tournaments
from players.models import Players
from match.models import Matches
from login.models import Account

def dashboardCount(request):
    # if ":" in request.get_host():
    #     middleName = ""
    # else:
    #     middleName = "/panchtatva"

    userCount = Account.objects.all().count()
    tournamentsCount = Tournaments.objects.all().count()
    playersCount = Players.objects.all().count()
    matchCount = Matches.objects.all().count()
    # feedbackCount = Tournaments.objects.all().count()
    return {"dashboard_count": {'userCount': userCount, 'tournamentsCount': tournamentsCount, 'matchCount': matchCount,
                                'playersCount': playersCount}}