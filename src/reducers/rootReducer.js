import formReducer from './formReducer'
import appReducer from './appReducer'
import { combineReducers } from 'redux'
  
 
const rootReducer = combineReducers({
    form : formReducer,
    app : appReducer
})

export default rootReducer