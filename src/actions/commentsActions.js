import axios from "axios";
import { API_LINK } from "../config";

export const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_ERROR = "GET_COMMENTS_ERROR";

export const PUSH_COMMENT_REQUEST = "PUSH_COMMENT_REQUEST";
export const PUSH_COMMENT_SUCCESS = "PUSH_COMMENT_SUCCESS";
export const PUSH_COMMENT_ERROR = "PUSH_COMMENT_ERROR";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";

export const getComments = id => dispatch => {
  dispatch({
    type: GET_COMMENTS_REQUEST
  });

  axios
    .get(`${API_LINK}/comment/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: GET_COMMENTS_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: GET_COMMENTS_SUCCESS,
          payload: res.data.comments
        });
      }
    });
};

export const pushComment = (id, data) => dispatch => {
  dispatch({
    type: PUSH_COMMENT_REQUEST
  });

  axios
    .post(`${API_LINK}/comment/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: PUSH_COMMENT_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: PUSH_COMMENT_SUCCESS
        });
        dispatch(getComments(id));
      }
    });
};

export const deleteCommentById = id => dispatch => {
  dispatch({
    type: DELETE_COMMENT_REQUEST
  });

  axios
    .delete(`${API_LINK}/comment/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: DELETE_COMMENT_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: DELETE_COMMENT_SUCCESS,
          payload: id
        });
      }
    });
};
