import axios from 'axios';


export const getUser = () => (dispatch) => {
    const token = db.getItem(db.getConfigureKey());
  
    dispatch({
      type: GET_USER_REQUEST,
    });
  
    if (!token) {
      dispatch({
        type: GET_USER_ERROR,
        payload: 'You have got no token.',
      });
      _Router.goTo('/login');
    } else {
      axios.get(GET_USER_LINK, {
        'headers': { 'Authorization': `Bearer ${token}` }
      })
        .then((res) => {
                const successAuthentification = res.data.success
  
                if (successAuthentification) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        payload: res.data.user
                    })
                    _Router.goTo('/')
                }
            })
            .catch(e => {
                dispatch({
                    type: GET_USER_ERROR,
                    payload: "Some error was happend."
                })
                _Router.goTo('/login')
            })
    }
  }