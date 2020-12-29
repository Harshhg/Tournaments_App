import axios from 'axios'
export const getPlayerDetail=(id)=>{
    return(dispatch=>{
        dispatch(getPlayerDetailRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        let key=id
        const api='http://139.59.16.180:8001/players?id='+key
        axios.get(api,{headers:{'Authorization':y}})
        .then(response=>{
            const playerdetail=response.data.data
            dispatch(getPlayerDetailSuccess(playerdetail))
        })
        .catch(error=>{
            dispatch(getPlayerDetailFailure(error))
        })
    })
}
export const getPlayerDetailRequest=()=>{
    return{
        type:'GET_PLAYER_DETAIL_REQUEST'
    }
}
export const getPlayerDetailSuccess=(data)=>{
    return{
        type:'GET_PLAYER_DETAIL_SUCCESS',
        payload:data
    }
}
export const getPlayerDetailFailure=(error)=>{
    return{
        type:'GET_PLAYER_DETAIL_FAILURE',
        payload:error
    }
}