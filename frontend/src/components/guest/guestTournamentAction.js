import axios from 'axios';
import Swal from 'sweetalert2';
export const guestUpcomingTournament=()=>{
    return(dispatch=>{
        dispatch(guestUpcomingTournamentRequest())
        axios.get('http://139.59.16.180:8001/tournament/upcoming/')
        .then(response=>{
            const tournamentdata=response.data.data
            dispatch(guestUpcomingTournamentSucccess(tournamentdata))
        })
        .catch(error=>{
            console.log(error)
            Swal.fire({
                title:error.message,
                icon:'error'
            })
            dispatch(guestUpcomingTournamentFailure(error.message))
        })
    })
}
export const guestUpcomingTournamentRequest=()=>{
    return{
        type:'GET_UPCOMING_TOURNAMENT_REQUEST'
    }
}
export const guestUpcomingTournamentSucccess=(data)=>{
    return{
        type:'GET_UPCOMING_TOURNAMENT_SUCCESS',
        payload:data
    }
}
export const guestUpcomingTournamentFailure=(error)=>{
    return{
        type:'GET_UPCOMING_TOURNAMENT_FAILURE',
        payload:error
    }
}
export const guestOngoingTournament=()=>{
    return(dispatch=>{
        dispatch(guestOngoingTournamentRequest())
        axios.get('http://139.59.16.180:8001/tournament/ongoing/')
        .then(response=>{
            const otournamentdata=response.data.data
            // console.log(response)
            dispatch(guestOngoingTournamentSucccess(otournamentdata))
        })
        .catch(error=>{
            dispatch(guestOngoingTournamentFailure(error.message))
        })
    })
}
export const guestOngoingTournamentRequest=()=>{
    return{
        type:'GET_ONGOING_TOURNAMENT_REQUEST'
    }
}
export const guestOngoingTournamentSucccess=(otournamentdata)=>{
    return{
        type:'GET_ONGOING_TOURNAMENT_SUCCESS',
        payload:otournamentdata
    }
}
export const guestOngoingTournamentFailure=(error)=>{
    return{
        type:'GET_ONGOING_TOURNAMENT_FAILURE',
        payload:error
    }
}
export const guestPreviousTournament=()=>{
    return(dispatch=>{
        dispatch(guestPreviousTournamentRequest())
        axios.get('http://139.59.16.180:8001/tournament/previous/')
        .then(response=>{
            const ptournamentdata=response.data.data
            // console.log(ptournamentdata)
            dispatch(guestPreviousTournamentSucccess(ptournamentdata))
        })
        .catch(error=>{
            dispatch(guestPreviousTournamentFailure(error.message))
        })
    })
}
export const guestPreviousTournamentRequest=()=>{
    return{
        type:'GET_PREVIOUS_TOURNAMENT_REQUEST'
    }
}
export const guestPreviousTournamentSucccess=(ptournamentdata)=>{
    return{
        type:'GET_PREVIOUS_TOURNAMENT_SUCCESS',
        payload:ptournamentdata
    }
}
export const guestPreviousTournamentFailure=(error)=>{
    return{
        type:'GET_PREVIOUS_TOURNAMENT_FAILURE',
        payload:error
    }
}