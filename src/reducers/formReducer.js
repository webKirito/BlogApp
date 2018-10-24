import { 
    LOGIN_USER_REQUEST, 
    REGISTER_USER_REQUEST,
    LOGIN_USER_ERROR,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS, 
    LOGIN_USER_SUCCESS,
} from "../actions/formActions"

const initialState = {
  error : "",
  success: false
}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOGIN_USER_REQUEST:
      return {...state, }
    case REGISTER_USER_REQUEST:
      return {...state, }
    case LOGIN_USER_ERROR:
      return {...state, error : action.payload }
    case REGISTER_USER_ERROR:
      return {...state, error : action.payload }
    case LOGIN_USER_SUCCESS:
      return {...state, success : true}
    case REGISTER_USER_SUCCESS : 
      return {...state, success : true }
    default:
      return state;
  }
}

export default formReducer