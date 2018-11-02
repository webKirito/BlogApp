import {
  LOGIN_USER_REQUEST,
  REGISTER_USER_REQUEST,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  SET_ERROR_AS_EMPTY
} from "../actions/formActions";

const initialState = {
  error: "",
  success: false,
  loading: false
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case LOGIN_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, success: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, success: true };
    case SET_ERROR_AS_EMPTY:
      return { ...state, loading: false, error: "" };
    default:
      return state;
  }
};

export default formReducer;
