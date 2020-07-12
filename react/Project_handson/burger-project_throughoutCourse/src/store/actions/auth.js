import * as actionTypes from './actionTypes';
import axios from 'axios';
const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (idToken , localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken : idToken,
        localId : localId
    }
}
const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error : error
    }
}
const logoutRequest = () => {
    return {
        type:actionTypes.LOGOUT_REQUEST
    }
}
export const logoutStart = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('localId');
        dispatch(logoutRequest());
    }
}
export const auth = (email , password ,isSignUp) => {
    return dispatch => {
        const webAPIKey = 'AIzaSyDyKkcpoNSVKVudfSqxouXowktmkPAmrRU';
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+webAPIKey;
        if(isSignUp){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+webAPIKey;
        }
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        dispatch(authStart());
        axios.post( url ,authData)
        .then((res)=>{
            console.log("Success Auth :",res);
            //Store token information in Browser Local Storage
            //const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000 ) ;
            const expirationDate = new Date(new Date().getTime() + 60 * 1000 ) ;
            localStorage.setItem("token",res.data.idToken);
            localStorage.setItem("expirationDate",expirationDate);
            localStorage.setItem("localId",res.data.localId);
            dispatch(authSuccess(res.data.idToken , res.data.localId));
            dispatch(checkAuthTimeout(60));
        })
        .catch((error)=>{
            console.log(error);
            dispatch(authFail(error));
        })

    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(logoutStart());
        }
        else{
            const expirationDate= new Date (localStorage.getItem("expirationDate"));
            if(expirationDate > new Date()){
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(token , localId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
            else{
                dispatch(logoutStart());
            }
        }
    }
}

export const checkAuthTimeout = (expiresIn) => {
    console.log("check Auth Timeout :",expiresIn);
    return dispatch => {
        setTimeout(()=>{
            console.log("You have been logged out ! Please login again!");
            alert("You have been logged out ! Please login again");
            dispatch(logoutStart());
        },expiresIn * 1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH ,
        path : path
    }
}
