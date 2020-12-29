import axios from 'axios'
export const guestTournamentDetail=(id)=>{
    return(dispatch=>{
        dispatch(guestTournamentDetailRequest())
        let f=id
        let api='http://139.59.16.180:8001/tournaments?id='+f
        axios.get(api)
        .then(response=>{
            const tournamentdetail=response.data.data
            dispatch(guestTournamentDetailSuccess(tournamentdetail))
        })
        .catch(error=>{
            dispatch(guestTournamentDetailFailure(error.message))
        })
    })
}
export const guestTournamentDetailRequest=()=>{
    return{
        type:'GET_TOURNAMENT_DETAIL_REQUEST'
    }
}
export const guestTournamentDetailSuccess=(data)=>{
    return{
        type:'GET_TOURNAMENT_DETAIL_SUCCESS',
        payload:data
    }
}
export const guestTournamentDetailFailure=(error)=>{
    return{
        type:'GET_TOURNAMENT_DETAIL_FAILURE',
        payload:error
    }
}