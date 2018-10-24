import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../actions/formActions'
import { getUser } from '../actions/appActions' 
import styled from 'styled-components'


const mapStateToProps = store => {
    return {
        form : store.form
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    registerUser : (email, password) => dispatch(registerUser(email, password)),
    getUser: () => dispatch(getUser())
})

const FormCard = styled.div`
    margin-top: 20px;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ECECEC;
`;

const Input = styled.input`
    width: 90%;
    margin-top: 20px;
    font-size: 20px;
    outline: none;
`;

const ErrorContainer = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
`;

const Error = styled.div`
    margin: 10px;
    padding: 10px 0;
    text-align: center;
    border: 2px solid red;
    border-radius: 5px;
    font-weight: bold;
    width: 100%;
    background-color: white;
`;

class Form extends Component {

    state = {
        email: '',
        password: '', 
        isValid: false,
        hasChanges: false,
        errors: []
    }

    setEmail = (email) => {
        this.setState({
            ...this.state,
            isValid : this.isValid(this.state.email, this.state.password).isValid,
            errors : this.isValid(this.state.email, this.state.password).errors,
            email
        })
    }

    setPassword = (password) => {
        this.setState({
            ...this.state,
            isValid : this.isValid(this.state.email, this.state.password).isValid,
            errors : this.isValid(this.state.email, this.state.password).errors,
            password
        })
    }

    isValid = (email, password) => {
        let errorArray = []
        const emailLength = 1
        const passwordLength = 1
        const isEmail = [...email].includes("@")
        if ( email.length <= emailLength ) {
            errorArray.push("Name should be bigger. ")
        }
        if ( password.length <= passwordLength ) {
            errorArray.push("Password should be bigger. ")
        }
        if (!isEmail) {
            errorArray.push("You must use @ in your email. ")
        }
        return {
            isValid: email.length > emailLength && password.length > passwordLength && isEmail,
            errors : errorArray
        }
    }

    render() {
        console.log('render')
        const { loginUser, registerUser, getUser } = this.props
        let { success } = this.props.form
        if (success) {
            getUser()
            success = false
        }
        const { email, password, isValid, errors } = this.state
        return (
            <FormCard>
                <Input type="text" onKeyUp={e => this.setEmail(e.target.value)} placeholder="Enter email"/>
                <Input type="text" onKeyUp={ e => this.setPassword(e.target.value)} placeholder="Enter password"/>
                <ErrorContainer>
                    {errors.map((error, key) => {
                        return <Error key = {key}>{error}</Error>
                    })}
                </ErrorContainer>
                <button disabled={!isValid} onClick={() => loginUser(email, password)}>Login</button>
                <button disabled={!isValid} onClick={() => registerUser(email, password)}>Register</button>
            </FormCard>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)