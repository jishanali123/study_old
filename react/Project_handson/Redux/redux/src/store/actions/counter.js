import * as actionTypes from './actionTypes';

export const increment = () => {
    return {
        type : actionTypes.INCREMENT
    }
}
export const decrement = () => {
    return {
        type : actionTypes.DECREMENT
    }
}
export const add = (payloadData) => {
    return {
        type : actionTypes.ADD,
        ...payloadData
    }
}
export const subtract = (payloadData) => {
    return {
        type : actionTypes.SUBTRACT,
        ...payloadData
    }
}