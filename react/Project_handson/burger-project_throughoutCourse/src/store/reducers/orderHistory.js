import * as actionTypes from '../actions/actionTypes';

const initialState = {
    fetchedOrders : [],
    loading : true
}

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.START_LOADING_SPINNER : 
            return {
                ...state,
                loading : true
            }
        case actionTypes.FETCH_ORDER_SUCCESS :
            return {
                ...state,
                fetchedOrders : action.fetchedOrders,
                loading : false
            }
        case actionTypes.FETCH_ORDER_FAILED : 
            return {
                ...state,
                loading : false,
            }
        default :
            return state
    }
}

export default reducer;