import {
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  LOGOUT_USER
} from "../actions/appActions";

const initialState = {
  user: null,
  isLoading: false,
  error: "",
  loggedIn: false,
  loaded: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        loggedIn: true,
        loaded: true
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        loaded: true
      };
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, loaded: false };
    case LOGOUT_USER: {
      return { ...initialState, loaded: true };
    }
    default:
      return state;
  }
};

export default appReducer;
