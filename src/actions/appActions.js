import axios from 'axios';
import { GET_USER_LINK } from '../config';
import db from '../externalClasses/localDB';
import _Router from '../externalClasses/myRouter';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';


export const getUser = () => (dispatch) => {
  const token = db.getItem(db.getConfigureKey());

  dispatch({
    type: GET_USER_REQUEST,
  });

  if (!token) {
    dispatch({
      type: GET_USER_ERROR,
      payload: 'You have got no token.',
    });
    _Router.goTo('/login');
  } else {
    axios.get(GET_USER_LINK, {
      'headers': { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => {
              const successAuthentification = res.data.success

              if (successAuthentification) {
                  dispatch({
                      type: GET_USER_SUCCESS,
                      payload: res.data.user
                  })
                  _Router.goTo('/')
              }
          })
          .catch(e => {
              dispatch({
                  type: GET_USER_ERROR,
                  payload: 'Some error was happend.'
              })
              _Router.goTo('/login')
          })
  }
}

export const logoutUser = () => dispatch => {
    db.setItem(db.getConfigureKey(), '') 
    dispatch({
        type: LOGOUT_USER
    })
    _Router.goTo('/login')
}

