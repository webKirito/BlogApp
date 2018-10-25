import { Link } from 'react-router-dom'
import React , { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/appActions'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8vh;
  background-color: #D97091;
`;

const MenuList = styled.ul`
  display : flex;
  align-items : center;
  justify-content : center;
`;

const MenuListItem = styled.div`
  text-align: center;
  background-color: #fff;
  font-size: 3vh;
  margin: .5vh;
  padding: .5vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  color: #000000;
`;

const mapStateToProps = store => {
  return {
      app : store.app
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
})

const AllowedLinks = (props) => {
  return (
    <Fragment>
      <MenuListItem><StyledLink to='/'>Home</StyledLink></MenuListItem>
      <MenuListItem><StyledLink to='#' onClick={() => props.handleLogoutUser()}>Logout</StyledLink></MenuListItem>
    </Fragment>
  )
}


class Header extends React.Component {
  render() {
    const { loggedIn } = this.props.app
    const { logoutUser } = this.props
    // debugger;
    return (
      <StyledHeader>
        <MenuList>
          {loggedIn ? 
            <AllowedLinks handleLogoutUser={logoutUser}/> : 
            <MenuListItem><StyledLink to="/login">Login</StyledLink></MenuListItem> 
          }
        </MenuList>
      </StyledHeader>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)