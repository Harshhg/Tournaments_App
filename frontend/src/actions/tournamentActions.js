import axios from 'axios';
import Swal from 'sweetalert2';
export const getUpcomingTournament=()=>{
    return(dispatch=>{
        dispatch(getUpcomingTournamentRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.get('http://139.59.16.180:8001/tournament/upcoming/',{headers:{'Authorization':y}})
        .then(response=>{
            const tournamentdata=response.data.data
            dispatch(getUpcomingTournamentSucccess(tournamentdata))
        })
        .catch(error=>{
            console.log(error)
            Swal.fire({
                title:error.message,
                icon:'error'
            })
            dispatch(getUpcomingTournamentFailure(error.message))
        })
    })
}
export const getUpcomingTournamentRequest=()=>{
    return{
        type:'GET_UPCOMING_TOURNAMENT_REQUEST'
    }
}
export const getUpcomingTournamentSucccess=(data)=>{
    return{
        type:'GET_UPCOMING_TOURNAMENT_SUCCESS',
        payload:data
    }
}
export const getUpcomingTournamentFailure=(error)=>{
    return{
        type:'GET_UPCOMING_TOURNAMENT_FAILURE',
        payload:error
    }
}
export const getOngoingTournament=()=>{
    return(dispatch=>{
        dispatch(getOngoingTournamentRequest())
        var x=localStorage.getItem('token')
        var y='Token '+x
        axios.get('http://139.59.16.180:8001/tournament/ongoing/',{headers:{'Authorization':y}})
        .then(response=>{
            const otournamentdata=response.data.data
            // console.log(response)
            dispatch(getOngoingTournamentSucccess(otournamentdata))
        })
        .catch(error=>{
            dispatch(getOngoingTournamentFailure(error.message))
        })
    })
}
export const getOngoingTournamentRequest=()=>{
    return{
        type:'GET_ONGOING_TOURNAMENT_REQUEST'
    }
}
export const getOngoingTournamentSucccess=(otournamentdata)=>{
    return{
        type:'GET_ONGOING_TOURNAMENT_SUCCESS',
        payload:otournamentdata
    }
}
export const getOngoingTournamentFailure=(error)=>{
    return{
        type:'GET_ONGOING_TOURNAMENT_FAILURE',
        payload:error
    }
}
export const getPreviousTournament=()=>{
    return(dispatch=>{
        dispatch(getPreviousTournamentRequest())
        var x=localStorage.getItem('token')
        var y='Token '+x
        axios.get('http://139.59.16.180:8001/tournament/previous/',{headers:{'Authorization':y}})
        .then(response=>{
            const ptournamentdata=response.data.data
            // console.log(ptournamentdata)
            dispatch(getPreviousTournamentSucccess(ptournamentdata))
        })
        .catch(error=>{
            dispatch(getPreviousTournamentFailure(error.message))
        })
    })
}
export const getPreviousTournamentRequest=()=>{
    return{
        type:'GET_PREVIOUS_TOURNAMENT_REQUEST'
    }
}
export const getPreviousTournamentSucccess=(ptournamentdata)=>{
    return{
        type:'GET_PREVIOUS_TOURNAMENT_SUCCESS',
        payload:ptournamentdata
    }
}
export const getPreviousTournamentFailure=(error)=>{
    return{
        type:'GET_PREVIOUS_TOURNAMENT_FAILURE',
        payload:error
    }
}