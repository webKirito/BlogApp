import {
  GET_POSTS_REQUEST,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_POSTS_BY_TITLE_ERROR,
  GET_POSTS_BY_TITLE_REQUEST,
  GET_POSTS_BY_TITLE_SUCCESS
} from "../actions/blogActions";

const initialState = {
  posts: [],
  isLoading: false,
  categories: [],
  error: ""
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_POSTS_SUCCESS:
      return { ...state, isLoading: false, posts: action.payload };
    case GET_POSTS_BY_TITLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTS_BY_TITLE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_POSTS_BY_TITLE_SUCCESS:
      return { ...state, isLoading: false, posts: action.payload };
    case GET_CATEGORIES_REQUEST:
      return { ...state, isLoading: true };
    case GET_CATEGORIES_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: action.payload };
    default:
      return state;
  }
};

export default blogReducer;
