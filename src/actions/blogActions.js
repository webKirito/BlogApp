import axios from "axios";
import { API_LINK } from "../config";

export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_ERROR = "GET_POSTS_ERROR";

export const GET_POSTS_BY_TITLE_REQUEST = "GET_POSTS_BY_TITLE_REQUEST";
export const GET_POSTS_BY_TITLE_SUCCESS = "GET_POSTS_BY_TITLE_SUCCESS";
export const GET_POSTS_BY_TITLE_ERROR = "GET_POSTS_BY_TITLE_ERROR";

export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_ERROR = "GET_CATEGORIES_ERROR";

export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_ERROR = "GET_POST_ERROR";

export const PUT_POST_REQUEST = "GET_POST_REQUEST";
export const PUT_POST_SUCCESS = "GET_POST_SUCCESS";
export const PUT_POST_ERROR = "GET_POST_ERROR";

export const DELETE_POST_REQUEST = "GET_POST_REQUEST";
export const DELETE_POST_SUCCESS = "GET_POST_SUCCESS";
export const DELETE_POST_ERROR = "GET_POST_ERROR";

// export const GET_POST_REQUEST = 'GET_POST_REQUEST';
// export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
// export const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = () => dispatch => {
  dispatch({
    type: GET_POSTS_REQUEST
  });

  axios
    .get(`${API_LINK}/post`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: GET_POSTS_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: GET_POSTS_SUCCESS,
          payload: res.data.data
        });
      }
    });
};

export const getCategories = () => dispatch => {
  dispatch({
    type: GET_CATEGORIES_REQUEST
  });

  axios
    .get(`${API_LINK}/category`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: GET_CATEGORIES_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: res.data.categories
        });
      }
    });
};

export const getItemsByCategory = title => dispatch => {
  dispatch({
    type: GET_POSTS_BY_TITLE_REQUEST
  });

  axios
    .get(`${API_LINK}/post/category/${title}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res, err) => {
      if (err) {
        dispatch({
          type: GET_POSTS_BY_TITLE_ERROR,
          payload: err
        });
      } else {
        dispatch({
          type: GET_POSTS_BY_TITLE_SUCCESS,
          payload: res.data.posts
        });
      }
    });
};
