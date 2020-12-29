const initialState={
    loading:false,
    fixturedata:[],
    error:""
}
const fixturesReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_FIXTURES_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_FIXTURES_SUCCESS':
            return{
                ...state,
                loading:false,
                fixturedata:action.payload,
                error:""
            }
        case 'GET_FIXTURES_FAILURE':
            return{
                ...state,
                loading:false,
                fixturedata:[],
                error:action.payload
            }
        default :
        return state
    }
}
export default fixturesReducer