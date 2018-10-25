import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser, setErrorToEmpty } from '../actions/formActions'
import Input from "@material-ui/core/Input" 
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'


const mapStateToProps = store => {
    return {
        form : store.form
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    registerUser : (email, password) => dispatch(registerUser(email, password)),
    setErrorToEmpty : () => dispatch(setErrorToEmpty())
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

const StyledInput = styled(Input)`
    width: 90%;
    margin-top: 20px;
    font-size: 20px;
`;

const ButtonContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
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
    border-radius: 20px;
    font-weight: bold;
    width: 100%;
    background-color: white;
`;

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.div`
   font-size:0.875rem;
   font-family: "Roboto", "Helvetica", "Arial", sans-serif;
   font-weight: 500;
   cursor: pointer;
   user-select: none;
`;

let errorArray = []

const MyCheckbox = (props) => {
    console.log(props)
    return (
        <CheckboxContainer onClick = {() => props.togglePasswordInputStyle()}>
            <Checkbox checked = {props.isSelected}/>
            <Text>Show your password</Text>
        </CheckboxContainer>
    );
}

class Form extends Component {

    state = {
        email: '',
        password: '', 
        isValid: false,
        hasChanges: false,
        errors: [],
        isLogin: true,
        inputIsPasswordType: true
    }

    togglePasswordInputStyle = () => {
        this.setState({
            ...this.state,
            inputIsPasswordType : !this.state.inputIsPasswordType
        })
    }

    setInputPasswordStyle = (statement) => {
        return statement ? "password" : "text"
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
        }, (...args) => {
            if (this.state.password.length >= 2) {
                console.log('valid')
            }
        })
    }

    isValid = (email, password) => {
        return {
            isValid: this.isValidEmail(email).isValid && this.isValidPassword(password).isValid,
            errors : [...this.isValidEmail(email).errors, ...this.isValidPassword(password).errors]
        }
    }

    isValidEmail = (email) => {
        errorArray = []
        const emailLength = 1
        const emailMaxLength = 16
        const isEmail = [...email].includes("@")
        if ( email.length <= emailLength ) {
            errorArray.push("Name should be bigger. ")
        }
        if ( email.length >= emailMaxLength ) {
            errorArray.push("Name should be less. ")
        }
        if (!isEmail) {
            errorArray.push("You must use @ in your email. ")
        }
        return {
            isValid: email.length >= emailLength && email.length <= emailMaxLength && isEmail,
            errors : errorArray
        }
    }

    isValidPassword = (password) => {
        errorArray = []
        const passwordLength = 1
        const passwordMaxLength = 16
        if ( password.length <= passwordLength ) {
            errorArray.push("Password should be bigger. ")
        }
        if ( password.length >= passwordMaxLength ) {
            errorArray.push("Password should be less. ")
        }
        return {
            isValid: password.length >= passwordLength &&  password.length <= passwordMaxLength,
            errors : errorArray
        }
    }

    deleteErrorAfterItsShowing = (error, setErrorToEmpty) => {
        if (error) {
            setErrorToEmpty()
        } 
    }

    render() {
        console.log('render')
        const { loginUser, registerUser, setErrorToEmpty } = this.props
        const { error } = this.props.form
        const { email, password, errors } = this.state
        this.deleteErrorAfterItsShowing(error, setErrorToEmpty)
        return (
            <FormCard>
                <StyledInput type="text" error={!this.isValidEmail(email).isValid} onKeyUp={ e => this.setEmail(e.target.value)} placeholder="Enter email"/>
                <StyledInput type={this.setInputPasswordStyle(this.state.inputIsPasswordType)} error={!this.isValidPassword(password).isValid} onKeyUp={ e => this.setPassword(e.target.value)} placeholder="Enter password"/>
                <ErrorContainer>
                    {!error ? 
                        errors.map((error, key) => {
                            return <Error key = {key}>{error}</Error>
                        }) : 
                        <Error key={error}>{error}</Error>
                    }
                </ErrorContainer>
                <ButtonForm props={{...this.state, togglePasswordInputStyle : this.togglePasswordInputStyle, loginUser, registerUser }}/>
                <Button onClick={() => this.setState({...this.state, isLogin : !this.state.isLogin})}>{this.state.isLogin ? "Sign up" : "Sign in"}</Button>
            </FormCard>
        )
    }
}

const ButtonForm = ({ props }) => {
    console.log("Button form", props)
    if (props.isLogin) {
        return (
            <ButtonContainer>
                <Button disabled={!props.isValid} onClick={() => props.loginUser(props.email, props.password)}>Login</Button>
                <MyCheckbox isSelected={!props.inputIsPasswordType} togglePasswordInputStyle={props.togglePasswordInputStyle}/>
            </ButtonContainer>
        )
    } else {
        return (
            <ButtonContainer>
                <Button disabled={!props.isValid} onClick={() => props.registerUser(props.email, props.password)}>Register</Button>
                <MyCheckbox isSelected={!props.inputIsPasswordType} togglePasswordInputStyle={props.togglePasswordInputStyle}/>
            </ButtonContainer>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)