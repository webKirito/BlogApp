import React, { Component } from 'react'
import Main from './Components/Main'
import Header from './Components/Header'

import './reset.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Main />
      </div>
    )
  }
}

export default App
