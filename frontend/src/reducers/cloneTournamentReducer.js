const initialState={
    loading:false,
    cdata:[],
    udata:[],
    error:""
}
const cloneTournamentReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'CLONE_TOURNAMENT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'CLONE_TOURNAMENT_SUCCESS':
            return{
                ...state,
                loading:false,
                cdata:action.payload,
                error:""
            }
        case 'CLONE_TOURNAMENT_FAILURE':
            return{
                ...state,
                loading:false,
                cdata:[],
                error:action.payload
            }
        case 'UPDATE TOURNAMENT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'UPDATE_TOURNAMENT_SUCCESS':
            return{
                ...state,
                loading:false,
                udata:action.payload,
                error:""
            }
        case 'UPDATE_TOURNAMENT_FAILURE':
            return{
                ...state,
                loading:false,
                udata:[],
                error:action.payload
            }
        default :
            return state
    }
}
export default cloneTournamentReducer