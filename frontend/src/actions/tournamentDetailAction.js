import axios from 'axios'
export const getTournamentDetail=(id)=>{
    return(dispatch=>{
        dispatch(getTournamentDetailRequest())
        var x=localStorage.getItem('token')
        var y='Token '+x
        var f=id
        var api='http://139.59.16.180:8001/tournaments?id='+f
        axios.get(api,{headers:{'Authorization':y}})
        .then(response=>{
            const tournamentdetail=response.data.data
            dispatch(getTournamentDetailSuccess(tournamentdetail))
        })
        .catch(error=>{
            dispatch(getTournamentDetailFailure(error.message))
        })
    })
}
export const getTournamentDetailRequest=()=>{
    return{
        type:'GET_TOURNAMENT_DETAIL_REQUEST'
    }
}
export const getTournamentDetailSuccess=(data)=>{
    return{
        type:'GET_TOURNAMENT_DETAIL_SUCCESS',
        payload:data
    }
}
export const getTournamentDetailFailure=(error)=>{
    return{
        type:'GET_TOURNAMENT_DETAIL_FAILURE',
        payload:error
    }
}