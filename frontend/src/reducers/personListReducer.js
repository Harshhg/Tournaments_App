const initialState={
    loading:false,
    person:[],
    error:''
}
const personListReducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'GET_PERSON_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'GET_PERSON_SUCCESS':
            return{
                ...state,
                loading:false,
                person:action.payload,
                error:''
            }    
        case 'GET_PERSON_FAILURE':
            return{
                laoding:false,
                person:[],
                error:action.payload
            }
        default:
            return state
    }
}
export default personListReducer