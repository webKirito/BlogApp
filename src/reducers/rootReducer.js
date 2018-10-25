import formReducer from './formReducer'
import appReducer from './appReducer'
import routingReducer from './routingReducer'
import { combineReducers } from 'redux'
  
 
const rootReducer = combineReducers({
    form : formReducer,
    app : appReducer,
    route : routingReducer
})

export default rootReducer