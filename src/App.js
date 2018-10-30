import React, { Component } from "react";
import Main from "./Components/Main";
import Header from "./Components/Header";

import { withRouter } from "react-router-dom";
import Preloader from "./Components/Preloarer";

import { getUser } from "./actions/appActions";
import { connect } from "react-redux";

import "./reset.css";

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
});

const mapStateToProps = state => {
  return {
    app: state.app
  };
};

const AppMainContainer = ({ loaded }) => {
  if (loaded) {
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    );
  }

  return <Preloader />;
};

class App extends Component {
  componentDidMount() {
    const { loaded } = this.props.app;
    if (!loaded) {
      this.props.getUser();
    }
  }

  render() {
    const { loaded } = this.props.app;
    return <AppMainContainer loaded={loaded} />;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
