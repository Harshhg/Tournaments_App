import axios from 'axios'
import Swal from 'sweetalert2'
export const getEditPlayer=(obj)=>{
    return(dispatch)=>{
        let x=localStorage.getItem('token')
        let y='Token '+x
        let api='http://139.59.16.180:8001/profile/update/'
        axios.put(api,obj,{headers:{'Authorization':y}})
        .then(response=>{
            console.log(response)
            const playerdata=response.data
            if(playerdata.message==="Profile Updated"){
                Swal.fire({
                    title:playerdata.message,
                    icon:'success'
                })
            dispatch(getEditPLayerSuccess(playerdata.message))
            }
        })
        .catch(error=>{
            Swal.fire({
                title:error.message,
                icon:'error'
            })
            dispatch(getEditPlayerFailure(error))
        })
    }
}
export const getEditPlayerRequest=()=>{
    return{
        type:'GET_EDIT_PLAYER_REQUEST'
    }
}
export const getEditPLayerSuccess=(data)=>{
    return{
        type:'GET_EDIT_PLAYER_SUCCESS',
        payload:data
    }
}
export const getEditPlayerFailure=(error)=>{
    return{
        type:'GET_EDIT_PLAYER_FAILURE',
        payload:error
    }
}