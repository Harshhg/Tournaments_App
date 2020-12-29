import {combineReducers} from 'redux'
import personListReducer from './personListReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import tournamentReducer from './tournamentReducer'
import createtournamentReducer from '../reducers/createtournamentReducer'
import tournamentDetailReducer from './tournamentDetailReducer'
import profileReducer from './profileReducer'
import addPlayerReducer from './addPlayerReducer'
import playerDetailReducer from './playerDetailReducer'
import searchPlayerReducer from './searchPlayerReducer'
import deleteTournamentReducer from './deleteTournamentReducer'
import cloneTournamentReducer from './cloneTournamentReducer'
import generateDrawReducer from './generateDrawReducer'
import fixturesReducer from './fixturesReducer'
const allReducers=combineReducers({
    personlist:personListReducer,
    signup:signupReducer,
    login:loginReducer,
    tournament:tournamentReducer,
    tour:createtournamentReducer,
    tournamentdetail:tournamentDetailReducer,
    profiledata:profileReducer,
    addplayer:addPlayerReducer,
    playerdetail:playerDetailReducer,
    searchplayer:searchPlayerReducer,
    deletetournament:deleteTournamentReducer,
    clonedata:cloneTournamentReducer,
    generatedraw:generateDrawReducer,
    fixture:fixturesReducer

})
export default allReducers