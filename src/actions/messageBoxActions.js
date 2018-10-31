export const SET_COMMENT = "SET_COMMENT";

export const setComment = msg => dispatch => {
  dispatch({
    type: SET_COMMENT,
    payload: msg
  });
};
