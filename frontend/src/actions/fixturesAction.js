import axios from 'axios'
export const getFixtures=(id)=>{
    return(dispatch=>{
        dispatch(getFixturesRequest())
        let x=localStorage.getItem('token')
        let y='Token '+x
        let f=id
        let api='http://139.59.16.180:8001/tournament/matches/?tournament_id='+f
        const guest=localStorage.getItem("guest")
        if(guest){
            axios.get(api)
            .then(response=>{
                const fixturesdetail=response.data.data
                dispatch(getFixturesSuccess(fixturesdetail))
            })
            .catch(error=>{
                dispatch(getFixturesFailure(error.message))
            })
        }else{
        axios.get(api,{headers:{'Authorization':y}})
        .then(response=>{
            const fixturesdetail=response.data.data
            dispatch(getFixturesSuccess(fixturesdetail))
        })
        .catch(error=>{
            dispatch(getFixturesFailure(error.message))
        })
        }
    })
}
export const getFixturesRequest=()=>{
    return{
        type:'GET_FIXTURES_REQUEST'
    }
}
export const getFixturesSuccess=(data)=>{
    return{
        type:'GET_FIXTURES_SUCCESS',
        payload:data
    }
}
export const getFixturesFailure=(error)=>{
    return{
        type:'GET_Fixtures_FAILURE',
        payload:error
    }
}