import axios from 'axios'
import Swal from 'sweetalert2'
export const AddTournamentPlayer=(obj)=>{
        return(dispatch)=>{
            dispatch(AddTournamentPlayerRequest())
            var x=localStorage.getItem('token')
            var y='Token '+x
            axios.post('http://139.59.16.180:8001/tournament/player/add/',obj,{headers:{'Authorization':y}})
            .then(response=>{
                const mydata=response.data.message
                if(mydata==="Player added successfully !"){
                    Swal.fire({
                        title:'Player added successfully !',
                        icon:"success",
                        timer:1000
                    })
                }else if(mydata==="This Player has already been added"){
                    Swal.fire({
                        title:mydata,
                        icon:'warning',
                        timer:1500
                    })
                }
                dispatch(AddTournamentPlayerSuccess(mydata))
            })
            .catch(error=>{
                Swal.fire(error.message)
                dispatch(AddTournamentPlayerFailure(error.message))
            })
        }
}
export const AddTournamentPlayerRequest=()=>{
    return{
        type:'ADD_TOURNAMENT_PLAYER_REQUEST'
    }
}
export const AddTournamentPlayerSuccess=(obj)=>{
    return{
        type:'ADD_TOURNAMENT_PLAYER_SUCCESS',
        payload:obj
    }
}
export const AddTournamentPlayerFailure=(error)=>{
    return{
        type:'ADD_TOURNAMENT_PLAYER_FAILURE',
        payload:error
    }
}
export const DeleteTournamentPlayer=(obj)=>{
    return(dispatch)=>{
        dispatch(DeleteTournamentPlayerRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.post('http://139.59.16.180:8001/tournament/player/delete/',obj,{headers:{'Authorization':y}})
        .then(response=>{
            const mydata=response.data.message
            if(response.data.message==="Player removed successfully "){
                Swal.fire({
                    title:mydata,
                    icon:'error',
                    timer:1500
                })
            }
            dispatch(DeleteTournamentPlayerSuccess(mydata))
        })
        .catch(error=>{
            Swal.fire({
                title:error.message
            })
            dispatch(DeleteTournamentPlayerFailure(error.message))
        })
    }
}
export const DeleteTournamentPlayerRequest=()=>{
    return{
        type:'DELETE_TOURNAMENT_PLAYER_REQUEST'
    }
}
export const DeleteTournamentPlayerSuccess=(obj)=>{
    return{
        type:'DELETE_TOURNAMENT_PLAYER_SUCCESS',
        payload:obj
    }
}
export const DeleteTournamentPlayerFailure=(error)=>{
    return{
        type:'DELETE_TOURNAMENT_PLAYER_FAILURE',
        payload:error
    }
}