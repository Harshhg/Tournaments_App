import axios from 'axios'
export const getSearchPlayer=(name,id)=>{
    return(dispatch=>{
        dispatch(getSearchPlayerRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        let api='http://139.59.16.180:8001/tournament/player?search='+name+'&tournament_id='+id
        axios.get(api,{headers:{'Authorization':y}})
        .then(response=>{
            const playerdata=response.data.data
            dispatch(getSearchPlayerSuccess(playerdata))
        })
        .catch(error=>{
            dispatch(getSearchPlayerFailure(error))
        })
    })
}
export const getSearchPlayerRequest=()=>{
    return{
        type:'GET_SEARCH_PLAYER_REQUEST'
    }
}
export const getSearchPlayerSuccess=(data)=>{
    return{
        type:'GET_SEARCH_PLAYER_SUCCESS',
        payload:data
    }
}
export const getSearchPlayerFailure=(error)=>{
    return{
        type:'GET_SEARCH_PLAYER_FAILURE',
        payload:error
    }
}