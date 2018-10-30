import axios from "axios";
import { API_LINK } from "../config";

export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_ERROR = "GET_POST_ERROR";

export const getPostById = id => dispatch => {
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
