import axios from 'axios'
import Swal from 'sweetalert2'
export const getGenerateDraw=(id)=>{
    return(dispatch=>{
        dispatch(getDrawRequest())
        var x=localStorage.getItem('token')
        var y='Token '+x
        // console.log("generate draws id",id)
        let obj={'tournament_id':id}
        axios.post('http://139.59.16.180:8001/tournament/generateDraws/',obj,{headers:{'Authorization':y}})
        .then(response=>{
            const generatedata=response.data.data
            // alert(response.data.message)
            console.log(response)
            if(response.data.message!=="Matched Generated Successfully !"){
                Swal.fire({
                    title:response.data.message,
                    icon:'warning',
                    timer:10000
                })
            }else{
            dispatch(getDrawSuccess(generatedata))
            }
        })
        .catch(error=>{
            dispatch(getDrawFailure(error))
        })
    })
}
export const getDrawRequest=()=>{
    return{
        type:'GET_DRAW_REQUEST'
    }
}
export const getDrawSuccess=(data)=>{
    return{
        type:'GET_DRAW_SUCCESS',
        payload:data
    }
}
export const getDrawFailure=(error)=>{
    return{
        type:'GET_DRAW_FAILURE',
        payload:error
    }
}