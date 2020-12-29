import tournamentReducer from "./tournamentReducer"

const initialState={
    loading:false,
    addplayer:[],
    deleteplayer:[],
    error:""
}
const tournamentPlayerReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_TOURNAMENT_PLAYER_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'ADD_TOURNAMENT_PLAYER_SUCCESS':
            return{
                ...state,
                loading:false,
                addplayer:action.payload,
                error:""
            }
        case 'ADD_TOURNAMENT_PLAYER_FAILURE':
            return{
                ...state,
                loading:false,
                addplayer:[],
                error:action.payload
            }
        case 'DELETE_TOURNAMENT_PLAYER_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'DELETE_TOURNAMENT_PLAYER_SUCCESS':
            return{
                ...state,
                loading:false,
                deleteplayer:action.payload,
                error:""
            }
        case 'DELETE_TOURNAMENT_PLAYER_FAILURE':
            return{
                ...state,
                loading:false,
                deleteplayer:[],
                error:action.payload
            }
        default :
        return state
    }
}
export default tournamentPlayerReducer