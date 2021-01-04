import axios from 'axios';
import Swal from 'sweetalert2'
export const getLogin=(obj)=>{
    return(dispatch)=>{
        dispatch(getLoginRequest())
        axios.post('http://139.59.16.180:8001/login/',obj)
        .then(response=>{
            console.log("response",response)
            const logindata=response.data
            const token=logindata.data.token
            localStorage.setItem('token',token)
            if(logindata.message==="Login Successful !!"){
            Swal.fire({
                title:"Login Successful",
                icon:'success',
                timer:100000
            })
            dispatch(getLoginSuccess(logindata.message))
            window.open("/tournaments","_self")
            }
            else if(logindata.message==="Invalid Credentials!") {
                Swal.fire({
                    title:'Invalid Credentials!',
                    icon:'error'
                })
                dispatch(getLoginSuccess(logindata))
            }else{
                Swal.fire({
                    title:logindata.message,
                    icon:'warning'
                })
            }
        })
        .catch(error=>{
            Swal.fire({
                title:error.message,
                icon:'error'
            })
            dispatch(GetLoginFailure(error.message))
        })
    }
}
export const getLoginRequest=()=>{
    return{
        type:'GET_LOGIN_REQUEST'
    }
}
export const getLoginSuccess=(obj)=>{
    return{
        type:'GET_lOGIN_SUCCESS',
        payload:obj
    }
}
export const GetLoginFailure=(error)=>{
    return{
        type:'GET_LOGIN_FAILURE',
        payload:error
    }
}


