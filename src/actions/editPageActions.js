import axios from "axios";
import { API_LINK } from "../config";

import _Router from "../externalClasses/myRouter";

export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_ERROR = "GET_POST_ERROR";
export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_ERROR = "UPDATE_POST_ERROR";

export const getPost = id => dispatch => {
  dispatch({
    type: GET_POST_REQUEST
  });

  axios
    .get(`${API_LINK}/post/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: GET_POST_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: GET_POST_SUCCESS,
          payload: res.data.data
        });
      }
    });
};

export const updatePost = post => dispatch => {
  dispatch({
    type: UPDATE_POST_REQUEST
  });

  axios
    .put(
      `${API_LINK}/post/${post.id}`,
      {
        ...post,
        updated_at: new Date().getMilliseconds()
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    )
    .then((res, err) => {
      if (err) {
        dispatch({
          type: UPDATE_POST_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: UPDATE_POST_SUCCESS
        });
        _Router.goTo(`post/${post.id}`);
      }
    });
};
