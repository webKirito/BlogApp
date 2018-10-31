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
  display: block;
  flex-direction: column;
  background-color: white;
  position: relative;
  margin: 20px 0;
  width: 80%;
  padding: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
`;

const StyledPostLine = styled.div`
  padding: 4px;
  &::first-letter {
    color: #8e24aa;
    text-transform: uppercase;
  }
`;

const StyledCategoryItem = styled.div`
  padding: 8px;
  width: 100%;
  font-size: 1.2em;
  background-color: #8e24aa;
  position: absolute;
  color: white;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.75);
`;

const StyledHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 0;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all ease-in 0.1s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
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
          <StyledCategoryItem>{post.category_name}</StyledCategoryItem>
          <StyledHeader>{post.title}</StyledHeader>
          <StyledPostLine>{post.body}</StyledPostLine>
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
