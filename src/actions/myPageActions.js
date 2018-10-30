import axios from "axios";
import { API_LINK } from "../config";

export const GET_MY_POSTS_REQUEST = "GET_MY_POSTS_REQUEST";
export const GET_MY_POSTS_SUCCESS = "GET_MY_POSTS_SUCCESS";
export const GET_MY_POSTS_ERROR = "GET_MY_POSTS_ERROR";
export const DELETE_MY_POST_REQUEST = "DELETE_MY_POST_REQUEST";
export const DELETE_MY_POST_SUCCESS = "DELETE_MY_POST_SUCCESS";
export const DELETE_MY_POST_ERROR = "DELETE_MY_POST_ERROR";

export const getPostsByAuthor = id => dispatch => {
  dispatch({
    type: GET_MY_POSTS_REQUEST
  });

  axios
    .get(`${API_LINK}/post/author/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: GET_MY_POSTS_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: GET_MY_POSTS_SUCCESS,
          payload: res.data.data
        });
      }
    });
};

export const deletePostById = id => dispatch => {
  dispatch({
    type: DELETE_MY_POST_REQUEST
  });

  axios
    .delete(`${API_LINK}/post/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: DELETE_MY_POST_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: DELETE_MY_POST_SUCCESS,
          payload: id
        });
      }
    });
};
