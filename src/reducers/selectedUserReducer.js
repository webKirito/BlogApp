import { SET_SELECTED_USER } from "../actions/selectUserActions";

const initialState = {
  currentUser: {}
};

const selectedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return { currentUser: action.payload };
    default:
      return state;
  }
};

export default selectedUserReducer;
