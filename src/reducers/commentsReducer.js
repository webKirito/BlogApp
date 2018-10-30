import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
  PUSH_COMMENT_ERROR,
  PUSH_COMMENT_REQUEST,
  PUSH_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS
} from "../actions/commentsActions";

const initialState = {
  comments: [],
  isLoading: false,
  error: ""
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_COMMENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_COMMENTS_SUCCESS:
      return { ...state, isLoading: false, comments: action.payload };
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter(
          comment => comment.id !== action.payload
        )
      };
    case PUSH_COMMENT_REQUEST:
      return { ...state, isLoading: true };
    case PUSH_COMMENT_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case PUSH_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default commentsReducer;
