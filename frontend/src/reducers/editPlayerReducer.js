const initialState={
    laoding:false,
    editplayerdata:[],
    error:""
}
const editPlayerReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_EDIT_PLAYER_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_EDIT_PLAYER_SUCCESS':
            return{
                ...state,
                loading:false,
                editplayerdata:action.payload,
                error:""
            }
        case 'GET_EDIT_PLAYER_FAILURE':
            return{
                ...state,
                loading:false,
                editplayerdata:[],
                error:action.payload
            }
        default :
        return state
    }
}
export default editPlayerReducer