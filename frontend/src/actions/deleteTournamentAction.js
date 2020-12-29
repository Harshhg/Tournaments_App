import axios from 'axios'
import Swal from 'sweetalert2'
export const deleteTournament=(obj)=>{
    return(dispatch)=>{
        dispatch(deleteTournamentRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.post('http://139.59.16.180:8001/tournament/delete/',obj,{headers:{'Authorization':y}})
        .then(response=>{
            const msg=response.data.message
            Swal.fire({
                title:'Tournament Deleted Successfully!',
                icon:'success'
            })
            dispatch(deleteTournamentSuccess(msg))
        })
        .catch(error=>{
            dispatch(deleteTournamentFailure(error))
        })
    }
}
export const deleteTournamentRequest=()=>{
    return{
        type:'DELETE_TOURNAMENT_REQUEST'
    }
}
export const deleteTournamentSuccess=(data)=>{
    return{
        type:'DELETE_TOURNAMENT_SUCCESS',
        payload:data
    }
}
export const deleteTournamentFailure=(error)=>{
    return{
        type:'DELETE_TOURNAMENT_FAILURE',
        payload:error
    }
}