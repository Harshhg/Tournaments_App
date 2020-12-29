const initialState={
    loading:false,
    pdata:[],
    error:""
}
const profileReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_PROFILE_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_PROFILE_SUCCESS':
            return{
                ...state,
                loading:false,
                pdata:action.payload,
                error:""
            }
        case 'GET_PROFILE_FAILURE':
            return{
                ...state,
                loading:false,
                pdata:[],
                error:action.payload
            }
        default :
        return state
    }
}
export default profileReducer