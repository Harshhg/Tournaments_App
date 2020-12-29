const initialState={
    loading:false,
    tdata:[],
    error:""
}
const createtournamentReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_TOURNAMENT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_TOURNAMENT_SUCCESS':
            return{
                ...state,
                loading:false,
                tdata:action.payload,
                error:""
            }
        case 'GET_TOURNAMENT_FAILURE':
            return{
                ...state,
                loading:false,
                tdata:[],
                error:action.payload
            }
        default:
            return state
    }
}
export default createtournamentReducer