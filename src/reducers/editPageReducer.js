import {
  GET_POST_ERROR,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  UPDATE_POST_ERROR,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS
} from "../actions/editPageActions";

const initialState = {
  post: {},
  isLoading: false,
  error: ""
};

const editPageReducer = (state = initialState, action) => {
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
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: {}
      };
    default:
      return state;
  }
};

export default editPageReducer;
