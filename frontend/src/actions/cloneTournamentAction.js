import axios from 'axios'
export const cloneTournament=(obj)=>{
    return(dispatch)=>{
        dispatch(cloneTournamentRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        axios.post('http://139.59.16.180:8001/tournament/clone/',obj,{headers:{'Authorization':y}})
        .then(response=>{
            // console.log(response)
            const msg=response.data.data
            alert(response.data.message)
            dispatch(cloneTournamentSuccess(msg))
        })
        .catch(error=>{
            dispatch(cloneTournamentFailure(error))
        })
    }
}
export const cloneTournamentRequest=()=>{
    return{
        type:'CLONE_TOURNAMENT_REQUEST'
    }
}
export const cloneTournamentSuccess=(data)=>{
    return{
        type:'CLONE_TOURNAMENT_SUCCESS',
        payload:data
    }
}
export const cloneTournamentFailure=(error)=>{
    return{
        type:'CLONE_TOURNAMENT_FAILURE',
        payload:error
    }
}
export const updateTournament=(data,id)=>{
    return(dispatch)=>{
        dispatch(updateTournamentRequest())
        var x=localStorage.getItem('token')
        var y='Token '+x
        // let data={'name':obj.name}
        var api='http://139.59.16.180:8001/tournament/update/?id='+id
        axios.post(api,data,{headers:{'Authorization':y}})
        .then(response=>{
            // console.log("update data",response)
            if(response.data.message==="Success")
            {
                const msg=response.data.message
                dispatch(updateTournamentSuccess(msg))
            }else{
                alert("please update image!")
            }
        })
        .catch(error=>{
            dispatch(updateTournamentFailure(error))
        })
    }
}
export const updateTournamentRequest=()=>{
    return{
        type:'UPDATE_TOURNAMENT_REQUEST'
    }
}
export const updateTournamentSuccess=(data)=>{
    return{
        type:'UPDATE_TOURNAMENT_SUCCESS',
        payload:alert(data)
    }
}
export const updateTournamentFailure=(error)=>{
    return{
        type:'UPDATE_TOURNAMENT_FAILURE',
        payload:error
    }
}
