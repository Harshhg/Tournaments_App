const intialState={
    loading:false,
    pdetail:[],
    error:""
}
const playerDetailReducer=(state=intialState,action)=>{
    switch(action.type){
        case 'GET_PLAYER_DETAIL_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_PLAYER_DETAIL_SUCCESS':
            return{
                ...state,
                loading:false,
                pdetail:action.payload,
                error:""
            }
        case 'GET_PLAYER_DETAIL_FAILURE':
            return{
                ...state,
                loading:false,
                pdetail:[],
                error:action.payload
            }
        default:
            return state
    }
}
export default playerDetailReducer