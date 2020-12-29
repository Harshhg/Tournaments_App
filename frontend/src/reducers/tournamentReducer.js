const initialState={
    loading:false,
    utournamentdata:[],
    otournamentdata:[],
    ptournamentdata:[],
    error:""
}
const tournamentReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_UPCOMING_TOURNAMENT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_UPCOMING_TOURNAMENT_SUCCESS':
            return{
                ...state,
                loading:false,
                utournamentdata:action.payload,
                error:""
            }
        case 'GET_UPCOMING_TOURNAMENT_FAILURE':
            return{
                ...state,
                loading:false,
                utournamentdata:[],
                error:action.payload
            }
        case 'GET_ONGOING_TOURNAMENT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_ONGOING_TOURNAMENT_SUCCESS':
            return{
                ...state,
                loading:false,
                otournamentdata:action.payload,
                error:""
            }
        case 'GET_ONGOING_TOURNAMENT_FAILURE':
            return{
                ...state,
                loading:false,
                otournamentdata:[],
                error:action.payload
            }
        case 'GET_PREVIOUS_TOURNAMENT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_PREVIOUS_TOURNAMENT_SUCCESS':
            return{
                ...state,
                loading:false,
                ptournamentdata:action.payload,
                error:""
            }
         case 'GET_PREVIOUS_TOURNAMENT_FAILURE':
             return{
                 ...state,
                 loading:false,
                 ptournamentdata:false,
                 error:action.payload
             }
        default :
        return state
    }
}
export default tournamentReducer