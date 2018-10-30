export const SET_ROUTE = "SET_ROUTE";

export const setRoute = route => dispatch => {
  dispatch({
    type: SET_ROUTE,
    payload: route
  });
};
