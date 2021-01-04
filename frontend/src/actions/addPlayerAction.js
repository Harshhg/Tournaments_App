import axios from 'axios'
import Swal from 'sweetalert2'
export const getAddPlayer=(obj)=>{
    return(dispatch)=>{
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.post('http://139.59.16.180:8001/players/add/',obj,{headers:{'Authorization':y}})
        .then(response=>{
            console.log(response)
            const playerdata=response.data
            Swal.fire({
                title:playerdata.message,
                icon:'success',
                showConfirmButton: false,
            })
            dispatch(getAddPLayerSuccess(playerdata.message))
        })
        .catch(error=>{
            dispatch(getAddPlayerFailure(error))
        })
    }
}
export const getAddPlayerRequest=()=>{
    return{
        type:'GET_ADD_PLAYER_REQUEST'
    }
}
export const getAddPLayerSuccess=(data)=>{
    return{
        type:'GET_ADD_PLAYER_SUCCESS',
        payload:data
    }
}
export const getAddPlayerFailure=(error)=>{
    return{
        type:'GET_ADD_PLAYER_FAILURE',
        payload:error
    }
}