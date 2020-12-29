const initialState={
    loading:false,
    signup:[],
    error:''
}
const signupReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_SIGNUP_SUCCESS':
            return{
                loading:false,
                signup:action.payload,
                error:" "
            }
        case 'GET_SIGNUP_FAILURE':
            return{
                loading:false,
                signup:[],
                error:action.payload
            }
        default :return state
    }
}
export default signupReducer