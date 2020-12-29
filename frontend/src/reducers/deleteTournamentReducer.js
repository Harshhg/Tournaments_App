const initialState={
    loading:false,
    deldata:[],
    error:""
}
const deleteTournamentReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'DELETE_TOURNAMENT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'DELETE_TOURNAMENT_SUCCESS':
            return{
                ...state,
                loading:false,
                deldata:action.payload,
                error:""
            }
        case 'DELETE_TOURNAMENT_FAILURE':
            return{
                ...state,
                loading:false,
                deldata:[],
                error:action.payload
            }
        default:
            return state
    }
}
export default deleteTournamentReducer