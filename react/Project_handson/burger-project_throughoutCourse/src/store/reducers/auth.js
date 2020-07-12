import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false,
    authRedirectPath : '/'
}
const reducer = (state =initialState , action) => {
    switch(action.type) {
        case actionTypes.SET_AUTH_REDIRECT_PATH :
            return {
                ...state ,
                authRedirectPath : action.path
            }
        case actionTypes.AUTH_START : 
            return {
                ...state,
                loading : true
            }
        case actionTypes.AUTH_SUCCESS : 
            return {
                ...state,
                token : action.idToken,
                userId : action.localId,
                loading : false
            }
        case actionTypes.AUTH_FAIL : 
            return {
                ...state,
                error : action.error,
                loading : false
            }
        case actionTypes.LOGOUT_REQUEST : 
            return {
                ...state,
                token : null,
                userId : null
            }
        default : return state
    }
}

export default reducer;