import axios from 'axios';
import { REGISTER_API_LINK, LOGIN_API_LINK, TIME_FOR_ERROR_TO_DISAPPEAR } from '../config';
import db from '../externalClasses/localDB';

import _Router from '../externalClasses/myRouter';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const SET_ERROR_AS_EMPTY = 'SET_ERROR_AS_EMPTY';


export const setErrorToEmpty = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type : SET_ERROR_AS_EMPTY
        })
    }, 
    TIME_FOR_ERROR_TO_DISAPPEAR)
}


export const loginUser = (email, password) => (dispatch) => {
    dispatch({
        type: LOGIN_USER_REQUEST 
    })
    
    axios.post(LOGIN_API_LINK, {
            email: email,
            password: password
    })
    .then(res => {
        
        const successAuthentification = res.data.success

        

        if (successAuthentification) {
            db.configure(res.data.token)
            dispatch({
                type : LOGIN_USER_SUCCESS
            })
            _Router.goTo('/')
        } else {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: 'Cannot authentificate you.'
            }) 
        }
    })
    .catch(e => {
        dispatch({
            type : LOGIN_USER_ERROR,
            payload : e.toString()
        })
    })
}

export const registerUser = (email, password) => dispatch => {
    dispatch({
        type: REGISTER_USER_REQUEST
    })

    axios.post(REGISTER_API_LINK, {
        'email': email,
        'password': password
    })
        .then(res => {
            console.log(res)
            if (!res.data.success) {
                dispatch({
                    type: REGISTER_USER_ERROR,
                    payload: res.data.msg
                })
            } else {
                db.configure(res.data.token)
                dispatch({
                    type: REGISTER_USER_SUCCESS
                })
                _Router.goTo('/')
            }
        })
        .catch(e => {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: e.toString()
            })
        })
}