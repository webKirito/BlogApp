import { Switch, Route } from 'react-router-dom'
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


const Main = () => (
  <AppContainer>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Form}/>
    </Switch>
  </AppContainer>
)

export default Main