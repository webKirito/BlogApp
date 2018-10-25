import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../actions/appActions'

const mapStateToProps = store => {
    return {
        app : store.app
    }
}

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser())
})

class Home extends Component {
    
    componentDidMount() {
        this.props.getUser()
    }


    render() {
        const { user, isLoading } = this.props.app
        return (
            <div>
                <div>{isLoading ? "Loading" : "Not loading"}</div>
                <div>Hello, {user && user.email}</div>
            </div>
        );
    }
}

 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
