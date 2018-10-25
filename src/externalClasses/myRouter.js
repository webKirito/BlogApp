import { SET_ROUTE } from '../actions/routingActions'
import appHistory from '../history'




class Router {
    constructor() {
        this.history = appHistory
    }
    
    setRoute(route, dispatch) {
        dispatch({
            type: SET_ROUTE,
            payload: route
        })
    }
    goTo(route) {
        this.history.push(route)
    }
}

const _Router = new Router()

export default _Router