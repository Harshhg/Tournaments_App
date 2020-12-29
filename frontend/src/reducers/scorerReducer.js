const initialState={
    loading:false,
    score:[],
    error:''
}
const scorerReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_SCORER_REQUEST':
            return{
                ...state,
                loading:true,
            }
        case 'GET_SCORER_SUCCESS':
            return{
                ...state,
                loading:false,
                score:action.payload,
                error:" "
            }
        case 'GET_SCORER_FAILURE':
            return{
                ...state,
                loading:false,
                score:[],
                error:action.payload
            }
        default :return state
    }
}
export default signupReducer