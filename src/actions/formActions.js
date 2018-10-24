import axios from 'axios'
import { REGISTER_API_LINK , LOGIN_API_LINK } from '../config'
import db from '../externalClasses/localDB'

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST"
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR"






export const loginUser = (email, password) => dispatch => {
    dispatch({
        type: LOGIN_USER_REQUEST 
    })
    
    axios.post(LOGIN_API_LINK, {
            email: email,
            password: password
    })
    .then(res => {
        
        const successAuthentification = res.data.success

        db.configure(res.data.token)

        if (successAuthentification) {
            dispatch({
                type : LOGIN_USER_SUCCESS
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
        type : REGISTER_USER_REQUEST
    })

    axios.post(REGISTER_API_LINK, {
        "email": email,
        "password": password
    })
    .then(res => {
        db.configure(res.data.token)

        dispatch({
            type : REGISTER_USER_SUCCESS
        })
    })
    .catch(e => {
        dispatch({
            type : REGISTER_USER_ERROR,
            payload : e.toString()
        })
    })
}