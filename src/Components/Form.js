import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loginUser,
  registerUser,
  setErrorToEmpty
} from "../actions/formActions";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Preloader from "./Preloarer";
import styled from "styled-components";

const mapStateToProps = store => {
  return {
    form: store.form
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  registerUser: (email, password) => dispatch(registerUser(email, password)),
  setErrorToEmpty: () => dispatch(setErrorToEmpty())
});

const FormCard = styled.div`
  margin-top: 20px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 10px 10px 26px -6px rgba(0, 0, 0, 0.75);
`;

const StyledInput = styled(TextField)`
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
  border-bottom: 2px solid red;
  font-weight: bold;
  width: 100%;
  font-size: 0.975rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`;

let errorArray = [];

const MyCheckbox = props => {
  console.log(props);
  return (
    <CheckboxContainer onClick={() => props.togglePasswordInputStyle()}>
      <Checkbox checked={props.isSelected} />
      <Text>Show your password</Text>
    </CheckboxContainer>
  );
};

class Form extends Component {
  state = {
    email: "",
    password: "",
    isValid: false,
    hasChanges: false,
    errors: [],
    inputIsPasswordType: true,
    emailInputTouched: false,
    passwordInputTouched: false
  };

  togglePasswordInputStyle = () => {
    this.setState({
      ...this.state,
      inputIsPasswordType: !this.state.inputIsPasswordType
    });
  };

  setInputPasswordStyle = statement => {
    return statement ? "password" : "text";
  };

  setEmail = email => {
    this.setState({
      ...this.state,
      isValid: this.isValid(this.state.email, this.state.password).isValid,
      errors: this.isValid(this.state.email, this.state.password).errors,
      email
    });
  };

  setPassword = password => {
    this.setState({
      ...this.state,
      isValid: this.isValid(this.state.email, this.state.password).isValid,
      errors: this.isValid(this.state.email, this.state.password).errors,
      password
    });
  };

  isValid = (email, password) => {
    return {
      isValid:
        (!this.state.emailInputTouched || this.isValidEmail(email).isValid) &&
        (!this.state.passwordInputTouched ||
          this.isValidPassword(password).isValid),
      errors: [
        ...this.isValidEmail(email).errors,
        ...this.isValidPassword(password).errors
      ]
    };
  };

  isValidEmail = email => {
    errorArray = [];
    const emailLength = 1;
    const emailMaxLength = 16;
    const isEmail = [...email].includes("@");
    if (email.length <= emailLength) {
      errorArray.push("Name should be bigger. ");
    }
    if (email.length >= emailMaxLength) {
      errorArray.push("Name should be less. ");
    }
    if (!isEmail) {
      errorArray.push("You must use @ in your email. ");
    }
    return {
      isValid:
        email.length >= emailLength &&
        email.length <= emailMaxLength &&
        isEmail,
      errors: errorArray
    };
  };

  isValidPassword = password => {
    errorArray = [];
    const passwordLength = 1;
    const passwordMaxLength = 16;
    if (password.length <= passwordLength) {
      errorArray.push("Password should be bigger. ");
    }
    if (password.length >= passwordMaxLength) {
      errorArray.push("Password should be less. ");
    }
    return {
      isValid:
        password.length >= passwordLength &&
        password.length <= passwordMaxLength,
      errors: errorArray
    };
  };

  deleteErrorAfterItsShowing = (error, setErrorToEmpty) => {
    if (error) {
      setErrorToEmpty();
    }
  };

  render() {
    console.log(this.props.path);
    const { loginUser, registerUser, setErrorToEmpty } = this.props;
    const { error, isLoading } = this.props.form;
    const { email, password, errors } = this.state;
    this.deleteErrorAfterItsShowing(error, setErrorToEmpty);
    return !isLoading ? (
      <FormCard>
        <StyledInput
          margin="normal"
          variant="outlined"
          label="Email"
          type="text"
          error={
            this.state.emailInputTouched && !this.isValidEmail(email).isValid
          }
          onChange={e => this.setEmail(e.target.value)}
          onBlur={() =>
            this.setState({ ...this.state, emailInputTouched: true })
          }
        />
        <StyledInput
          margin="normal"
          variant="outlined"
          label="Password"
          type={this.setInputPasswordStyle(this.state.inputIsPasswordType)}
          error={
            this.state.emailInputTouched &&
            !this.isValidPassword(password).isValid
          }
          onChange={e => this.setPassword(e.target.value)}
        />
        <ErrorContainer>
          {!error ? (
            errors.map((error, key) => {
              return <Error key={key}>{error}</Error>;
            })
          ) : (
            <Error key={error}>{error}</Error>
          )}
        </ErrorContainer>
        <ButtonForm
          props={{
            ...this.state,
            togglePasswordInputStyle: this.togglePasswordInputStyle,
            loginUser,
            registerUser,
            path: this.props.location.pathname
          }}
        />
      </FormCard>
    ) : (
      <Preloader />
    );
  }
}

const ButtonForm = ({ props }) => {
  console.log(props.path);
  if (props.path === "/login") {
    return (
      <ButtonContainer>
        <MyCheckbox
          isSelected={!props.inputIsPasswordType}
          togglePasswordInputStyle={props.togglePasswordInputStyle}
        />
        <Button
          disabled={!props.isValid}
          onClick={() => props.loginUser(props.email, props.password)}
        >
          Login
        </Button>
      </ButtonContainer>
    );
  } else {
    return (
      <ButtonContainer>
        <Button
          disabled={!props.isValid}
          onClick={() => props.registerUser(props.email, props.password)}
        >
          Register
        </Button>
        <MyCheckbox
          isSelected={!props.inputIsPasswordType}
          togglePasswordInputStyle={props.togglePasswordInputStyle}
        />
      </ButtonContainer>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
