import axios from 'axios'
import Swal from 'sweetalert2'
export const getTournament=(obj)=>{
        return(dispatch)=>{
            // dispatch(getTournamentRequest())
            let x=localStorage.getItem('token')
            let y='Token '+x
            axios.post('http://139.59.16.180:8001/tournament/add/',obj,{headers:{'Authorization':y}})
            .then(response=>{
                const mydata=response.data.message
                console.log(response)
                if(mydata==="Tournament Successfully Created !"){
                    Swal.fire({
                        title:'Tournament successfully created',
                        icon:'success'
                    })
                dispatch(getTournamentSuccess(mydata))
                }
            })
            .catch(error=>{
                Swal.fire({
                    title:error.message,
                    icon:'error'
                })
                dispatch(getTournamentFailure(error.message))
            })
        }
}
export const getTournamentRequest=()=>{
    return{
        type:'GET_TOURNAMENT_REQUEST'
    }
}
export const getTournamentSuccess=(obj)=>{
    return{
        type:'GET_TOURNAMENT_SUCCESS',
        payload:obj
    }
}
export const getTournamentFailure=(error)=>{
    return{
        type:'GET_TOURNAMENT_FAILURE',
        payload:error
    }
}