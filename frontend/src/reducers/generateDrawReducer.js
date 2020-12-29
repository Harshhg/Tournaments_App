const initialState={
    loading:false,
    gdata:[],
    error:""
}
const generateDrawReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_DRAW_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_DRAW_SUCCESS':
            return{
                ...state,
                loading:false,
                gdata:action.payload,
                error:""
            }
        case 'GET_DRAW_FAILURE':
            return{
                ...state,
                loading:false,
                gdata:[],
                error:action.payload
            }
        default:
            return state
    }
}
export default generateDrawReducer