import { Switch, Route } from 'react-router'
import React from 'react'
import Home from './Home'
import Form from './Form'
import styled from 'styled-components'

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 92vh;
`;

// const mapStateToProps = store => {
//   return {
//       route : store.route
//   }
// }


// const Routes = {
//   '/' : Home,
//   '/login' : Form
// }

// const Main = () => (
//   <AppContainer>
//     <Switch>
//       <Route exact path='/' component={Home}/>
//       <Route path='/login' component={Form}/>
//     </Switch>
//   </AppContainer>
// )

class Main extends React.Component {
  render() {
    return (
      <AppContainer>
        <Switch>
          <Route path={'/login'} component={Form}/>
          <Route exact path={'/'} component={Home}/>
        </Switch>
      </AppContainer>
    )
  }
}

export default Main