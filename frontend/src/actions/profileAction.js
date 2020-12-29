import axios from 'axios'
import Swal from 'sweetalert2'
export const getProfile=()=>{
    return(dispatch=>{
        dispatch(getProfileRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.get('http://139.59.16.180:8001/profile',{headers:{'Authorization':y}})
        .then(response=>{
            const profiledata=response.data.data
            dispatch(getProfileSuccess(profiledata))
        })
        .catch(error=>{
            Swal.fire({
                title:error.message,
                icon:'error'
            })
            dispatch(getProfileFailure(error))
        })
    })
}
export const getProfileRequest=()=>{
    return{
    type:'GET_PROFILE_REQUEST'
    }
}
export const getProfileSuccess=(data)=>{
    return{
        type:'GET_PROFILE_SUCCESS',
        payload:data
    }
}
export const getProfileFailure=(error)=>{
    return{
        type:'GET_PROFILE_FAILURE',
        payload:error
    }
}