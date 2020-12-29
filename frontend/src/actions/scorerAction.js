import axios from 'axios'
import Swal from 'sweetalert2'
export const getScorer=(obj)=>{
    return(dispatch)=>{
        dispatch(getScorerRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.post('http://139.59.16.180:8001/match/score/update/',obj,{headers:{'Authorization':y}})
        .then(response=>{
            const msg=response.data.message
            Swal.fire({
                title:msg,
                timer:10000
            })
            dispatch(getScorerSuccess(msg))
        })
        .catch(error=>{
            dispatch(getScorerFailure(error))
        })
    }
}
export const getScorerRequest=()=>{
    return{
        type:'GET_SCORER_REQUEST'
    }
}
export const getScorerSuccess=(data)=>{
    return{
        type:'GET_SCORER_SUCCESS',
        payload:data
    }
}
export const getScorerFailure=(error)=>{
    return{
        type:'GET_SCORER_FAILURE',
        payload:error
    }
}