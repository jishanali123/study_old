import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = (payloadData) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ...payloadData
    }
}

export const removeIngredient = (payloadData) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ...payloadData
    }
}

const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENT,
        ingredients : ingredients
    }
}
const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-7b978.firebaseio.com/ingredients.json')
            .then(response =>{
                dispatch(setIngredients(response.data));
            })
        .catch(error => {
            console.log("Action : Reducer : failed while fetching ingredients");
            dispatch(fetchIngredientsFailed());
        })
    }
}