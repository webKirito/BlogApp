export const SET_SELECTED_USER = "SET_SELECTED_USER";

export const selectUser = user => dispatch => {
  dispatch({
    type: SET_SELECTED_USER,
    payload: user
  });
};
