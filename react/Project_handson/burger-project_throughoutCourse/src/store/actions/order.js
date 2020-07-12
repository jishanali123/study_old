import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id , orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData : orderData,
        orderId : id
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}

const startLoadingSpinner = () => {
    return {
        type : actionTypes.START_LOADING_SPINNER
    }
}

export const purchaseBurgerStart = (orderData,token) => {
    return dispatch => {
        dispatch(startLoadingSpinner());
        axios.post('order.json?auth='+token,orderData)
        .then(response => {
            console.log(response);
            dispatch(purchaseBurgerSuccess(response.data.name ,orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }

}

export const purchaseInit = () => {
    return dispatch => {
        return{
            type: actionTypes.PURCHASE_INIT
        }
    }
}