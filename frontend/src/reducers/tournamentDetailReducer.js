const initialState={
    loading:false,
    tdetail:[],
    error:""
}
const tournamentDetailReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_TOURNAMENT_DETAIL_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_TOURNAMENT_DETAIL_SUCCESS':
            return{
                ...state,
                loading:false,
                tdetail:action.payload,
                error:""
            }
        case 'GET_TOURNAMENT_DETAIL_FAILURE':
            return{
                ...state,
                loading:false,
                tdetail:[],
                error:action.payload
            }
        default :
        return state
    }
}
export default tournamentDetailReducer