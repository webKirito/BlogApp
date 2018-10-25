import { 
    SET_ROUTE,
} from "../actions/routingActions"

const initialState = {
  currentRoute : "/login"
}

const routingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { currentRoute : action.payload }
    default:
      return state;
  }
}

export default routingReducer