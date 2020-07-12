import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const fetchOrderSuccess = (fetchedOrders) => {
    return {
        type : actionTypes.FETCH_ORDER_SUCCESS,
        fetchedOrders : fetchedOrders
    }
}

const fetchOrderFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAILED,
        error : error
    }
}
const startLoadingSpinner = () => {
    return {
        type : actionTypes.START_LOADING_SPINNER
    }
}

export const fetchOrderHistory = (token , userId) => {
    return dispatch => {
        dispatch(startLoadingSpinner());
        const queryParams= '?auth='+token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/order.json'+queryParams)
        .then( res =>{
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrderFail(error));
        });
    }
}