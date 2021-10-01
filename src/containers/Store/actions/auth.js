import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    };
};

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authlogout=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authCheckTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(authlogout());
        },expirationTime * 1000) //due to this the session times out after 3600 seconds ie 1hr
    }
}

export const auth=(email,password,isSignup)=>{

    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6heXftC73b-uRCA9pYAqF_uargaJ38uI';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6heXftC73b-uRCA9pYAqF_uargaJ38uI';
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response.data);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(authCheckTimeout(response.data.expiresIn)); //expiresIn property contains time in which the user gets logged out automatically
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err.response.data.error)); //you can check in error in redux-devtool
        });

    }

}