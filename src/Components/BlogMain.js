import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled';

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    registerUser : (email, password) => dispatch(registerUser(email, password)),
    setErrorToEmpty : () => dispatch(setErrorToEmpty())
})

const mapStateToProps = (state) => {
    return {
        blog : state.blog
    };
}

class BlogMain extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    
)(BlogMain);