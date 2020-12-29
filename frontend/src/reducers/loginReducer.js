const initialState={
    loading:false,
    logindata:[],
    error:''
}
const loginReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'GET_LOGIN_EQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_LOGIN_SUCCESS':
            return{
                ...state,
                loading:false,
                logindata:action.payload,
                error:""
            }
        case 'GET_LOGIN_FAILURE':
            return{
                ...state,
                loading:false,
                logindata:[],
                error:action.payload
            }
        default :return state
    }
}
export default loginReducer