import { act } from 'react-dom/test-utils';
import * as actionType from '../actions/actionTypes';
import {updateObject} from './utility';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false
}

const authStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true});
}

const authSuccess=(state,action)=>{
    return updateObject(state,{error:null,token:action.token,userId:action.userId,loading:false});
}

const authFail=(state,action)=>{
    return updateObject(state,{error:action.error,loading:false})
}
const authLogout=(state,action)=>{
    return updateObject(state,{token:null,userId:null})
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(actionType.AUTH_START):
            return authStart(state,action);
        case(actionType.AUTH_SUCCESS):
            return authSuccess(state,action);
        case(actionType.AUTH_FAIL):
            return authFail(state,action);
        case(actionType.AUTH_LOGOUT):
            return authLogout(state,action);
        default:
            return state;
    }
}

export default reducer;