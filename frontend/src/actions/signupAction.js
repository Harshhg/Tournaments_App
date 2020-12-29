import axios from 'axios'
import Swal from 'sweetalert2'
export const getsignup=(obj)=>{
    return(dispatch)=>{
        axios.post('http://139.59.16.180:8001/register/',obj)
        .then(response=>{
            console.log(response)
            const mydata=response.data.message
            if(mydata!=="Successfully Registered !!"){
                Swal.fire({
                    title:mydata.email,
                    icon:'warning',
                })
            }else{
                Swal.fire({
                    title:mydata,
                    icon:'success'
                })
                dispatch(getSignupSuccess(mydata.message))
            }
        })
        .catch(error=>{
            dispatch(getSignupFailure(error.message))
        })
    }
}
export const getSignupRequest=()=>{
    return{
        type:'GET_SIGNUP_REQUEST'
    }
}
export const getSignupSuccess=(obj)=>{
    return{
        type:'GET_SIGUNUP_SUCCESS',
        payload:obj
    }
}
export const getSignupFailure=(error)=>{
    return{
        type:'GET_SIGNUP_FAILURE',
        payload:error
    }
}