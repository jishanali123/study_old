import * as actionTypes from './actions/actions';

const initialState ={
    counter : 3,
    results : []
}

const reducer = (state = initialState , action) =>{
    switch(action.type){
        case actionTypes.INCREMENT :
            return {
                ...state,
                counter : state.counter +1
            }
        case actionTypes.DECREMENT :
            return {
                ...state,
                counter : state.counter -1
            }
        case actionTypes.ADD :
            return {
                ...state,
                counter : state.counter +action.val
            }
        case actionTypes.SUBTRACT :
            return {
                ...state,
                counter : state.counter -action.val
            }
        case actionTypes.STORE_RESULT :
            console.log(state);
            let updatedState = {
                ...state,
                results : state.results.concat({id:new Date() ,value:state.counter})
            }
            return updatedState
        case actionTypes.DELETE_RESULT :
            /*
            const id = 2
            const newArray = [...state.results];
            newArray.splice(id,1);
            */
           const updatedArray = state.results.filter((result) =>{
                return result.id !== action.resultElId
           });
            return {
                ...state,
                results : updatedArray
            }
        default :
            return state
    }
   
    return state;
}

export default reducer;