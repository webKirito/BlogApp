import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../actions/postPageActions";
import styled from "styled-components";
import MessageBox from "./MessageBox";
import Preloader from "./Preloarer";

const mapStateToProps = state => {
  return {
    postPage: state.postPage
  };
};

const mapDispatchToProps = dispatch => ({
  getPostById: id => dispatch(getPostById(id))
});

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 70%;
  box-shadow: 10px 10px 29px -8px rgba(0, 0, 0, 0.75);
`;

const StyledPostLine = styled.div`
  border-bottom: 1px solid black;
  padding: 4px;
`;

const StyledHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 0;
`;

const StyledPostsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  background-color: white;
  width: 80vw;
  height: 75vh;
`;

class Post extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPostById(id);
  }

  render() {
    const { post, isLoading } = this.props.postPage;
    console.log(post);
    return !isLoading ? (
      <>
        <StyledPost>
          <StyledHeader>{post.title}</StyledHeader>
          <StyledPostLine>{post.body}</StyledPostLine>
          <StyledPostLine>{post.category_name}</StyledPostLine>
        </StyledPost>
        <MessageBox postId={post.id} />
      </>
    ) : (
      <Preloader />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
