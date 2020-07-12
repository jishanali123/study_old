import * as actionTypes from './actionTypes';

const saveResult =(payloadData) =>{
    return {
        type : actionTypes.STORE_RESULT,
        ...payloadData
    }
}
export const storeResult = (payloadData) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(payloadData));
        }, 2000);
    }
}
export const deleteResult = (payloadData) => {
    return {
        type : actionTypes.DELETE_RESULT,
        ...payloadData
    }
}