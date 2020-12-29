import axios from 'axios'
import Swal from 'sweetalert2'
export const getPlayerList=()=>{
    return(dispatch=>{
        dispatch(getPersonListRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.get('http://139.59.16.180:8001/players?id=',{headers:{'Authorization':y}})
        .then(response=>{
            const person=response.data.data
            dispatch(getPersonListSuccess(person))
        })
        .catch(error=>{
            Swal.fire({
                title:error.message,
                icon:'error'
            })
            dispatch(getPersonListFailure(error.message))
        })
    })
}
export const getPersonListRequest=()=>{
    return{
        type:'GET_PERSON_REQUEST'
    }
}
export const getPersonListSuccess=(person)=>{
    return{
        type:'GET_PERSON_SUCCESS',
        payload:person
    }
}
export const getPersonListFailure=(error)=>{
    return{
        type:'GET_PERSON_FAILURE',
        payload:error
    }
}