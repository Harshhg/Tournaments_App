import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import Tournaments from './Tournaments';
import Profile from './Profile';
import CreateDraw from './CreateDraw';
import TournamentDetails from './TournamentDetails';
import PlayerList from './PlayerList';
import AddPlayer from './AddPlayer';
import CreateTournament from './CreateTournament';
import PlayerDetail from './PlayerDetail';
import Match from './Match';
import Scorer from './Scorer';
import CloneTournament from './CloneTournament';
import Matches from './Matches';
import EditPlayer from './EditPlayer';
import Fixtures from './Fixtures';
import Mail from './changePassword/Mail';
import VerifyMail from './changePassword/VerifyMail';
import ChangePassword from './changePassword/ChangePassword';
import GuestTournaments from './guest/GuestTournaments';
import GuestTournamentDetails from './guest/GuestTournamentDetails';
const routes=()=>{
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/tournaments" component={Tournaments} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/createdraw" component={CreateDraw} />
                    <Route path="/tournamentdetails" component={TournamentDetails} />
                    <Route path="/playerlist" component={PlayerList} />
                    <Route path="/addplayer" component={AddPlayer} />
                    <Route path="/createtournament" component={CreateTournament} />
                    <Route path="/playerdetail" component={PlayerDetail} />
                    <Route path="/match" component={Match} />
                    <Route path="/scorer" component={Scorer} />
                    <Route path="/clonetournament" component={CloneTournament} />
                    <Route path="/matches" component={Matches} />
                    <Route path="/editplayer" component={EditPlayer} />
                    <Route path="/fixtures" component={Fixtures} />
                    <Route path="/mail" component={Mail} />
                    <Route path="/otp" component={VerifyMail} />
                    <Route path="/changepassword" component={ChangePassword} />
                    <Route path="/guesttournaments" component={GuestTournaments} />
                    <Route path="/guesttournamentdetails" component={GuestTournamentDetails} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default routes
