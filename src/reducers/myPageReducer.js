import {
  GET_MY_POSTS_ERROR,
  GET_MY_POSTS_REQUEST,
  GET_MY_POSTS_SUCCESS,
  DELETE_MY_POST_ERROR,
  DELETE_MY_POST_REQUEST,
  DELETE_MY_POST_SUCCESS
} from "../actions/myPageActions";

const initialState = {
  posts: [],
  comments: [],
  isLoading: false,
  error: ""
};

const postPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_MY_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_MY_POSTS_SUCCESS:
      return { ...state, isLoading: false, posts: action.payload };
    case DELETE_MY_POST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_MY_POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DELETE_MY_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    default:
      return state;
  }
};

export default postPageReducer;
