const initialState={
    laoding:false,
    playerdata:[],
    error:""
}
const addPlayerReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_ADD_PLAYER_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_ADD_PLAYER_SUCCESS':
            return{
                ...state,
                loading:false,
                playerdata:action.payload,
                error:""
            }
        case 'GET_ADD_PLAYER_FAILURE':
            return{
                ...state,
                loading:false,
                playerdata:[],
                error:action.payload
            }
        default :
        return state
    }
}
export default addPlayerReducer