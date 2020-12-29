const initialState={
    loading:false,
    sdata:[],
    error:""
}
const searchPlayerReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_SEARCH_PLAYER_REQUEST':
            return{
                loading:true
            }
        case 'GET_SEARCH_PLAYER_SUCCESS':
            return{
                ...state,
                loading:false,
                sdata:action.payload,
                error:""
            }
        case 'GET_SEARCH_PLAYER_FAILURE':
            return{
                ...state,
                loading:false,
                sdata:[],
                error:action.payload
            }
        default:
            return state
    }
}
export default searchPlayerReducer