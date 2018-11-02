import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { logoutUser } from "../actions/appActions";
import { selectUser } from "../actions/selectUserActions";
import PropTypes from "prop-types";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8vh;
  background-color: #8e24aa;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0px 2px 34px -5px rgba(0, 0, 0, 0.75);
`;

const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  background-color: #c158dc;
  margin: 0 10px;
  box-shadow: 0 5px 5px #5c007a;
  color: white;
  padding: 1em 1.5em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all ease-out 0.2s;
  &:hover {
    background-color: #4f115f;
    box-shadow: 0 7px 7px #5c007a;
    cursor: pointer;
  }

  &:active {
    box-shadow: none;
    top: 5px;
  }
`;

const mapStateToProps = store => {
  return {
    app: store.app
  };
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  selectUser: user => dispatch(selectUser(user))
});

const AllowedLinks = props => {
  return (
    <Fragment>
      <StyledLink to="/">Blog</StyledLink>

      <StyledLink to="/myAccount" onClick={() => props.visitMyAccount()}>
        My Account
      </StyledLink>

      <StyledLink to="#" onClick={() => props.handleLogoutUser()}>
        Logout
      </StyledLink>
    </Fragment>
  );
};

AllowedLinks.propTypes = {
  visitMyAccount: PropTypes.func.isRequired,
  handleLogoutUser: PropTypes.func.isRequired
};

class Header extends React.Component {
  visitMyAccount = () => {
    this.props.selectUser({
      id: this.props.app.user.id,
      login: this.props.app.user.login
    });
  };

  render() {
    const { loggedIn } = this.props.app;
    const { logoutUser } = this.props;

    return (
      <StyledHeader>
        <MenuList>
          {loggedIn ? (
            <AllowedLinks
              handleLogoutUser={logoutUser}
              visitMyAccount={this.visitMyAccount}
            />
          ) : (
            <>
              <StyledLink to="/login">Login</StyledLink>

              <StyledLink to="/register">Register</StyledLink>
            </>
          )}
        </MenuList>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  app: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
