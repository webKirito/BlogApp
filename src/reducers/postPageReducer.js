import {
  GET_POST_REQUEST,
  GET_POST_ERROR,
  GET_POST_SUCCESS
} from "../actions/blogActions";

const initialState = {
  post: {},
  comments: [],
  isLoading: false,
  error: ""
};

const postPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_POST_SUCCESS:
      return { ...state, isLoading: false, post: action.payload };
    default:
      return state;
  }
};

export default postPageReducer;
