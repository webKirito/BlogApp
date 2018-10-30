import { Switch, Route } from "react-router";
import React from "react";
import Form from "./Form";
import BlogMain from "./Blog/BlogMain";
import MyPage from "./MyPage/MyPage";
import Post from "./Post";
import EditForm from "./MyPage/EditForm";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 92vh;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
`;

class Main extends React.Component {
  render() {
    return (
      <AppContainer>
        <Switch>
          <Route path={"/login"} component={Form} />
          <Route path={"/register"} component={Form} />
          <Route exact path={"/"} component={BlogMain} />
          <Route path={"/myAccount"} component={MyPage} />
          <Route path={"/post/:id/edit"} component={EditForm} />
          <Route path={"/post/:id"} component={Post} />
        </Switch>
      </AppContainer>
    );
  }
}

export default Main;
