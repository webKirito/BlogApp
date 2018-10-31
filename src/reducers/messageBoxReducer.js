import { SET_COMMENT } from "../actions/messageBoxActions";

const initialState = {
  message: ""
};

const messageBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return { message: action.payload };
    default:
      return state;
  }
};

export default messageBoxReducer;
