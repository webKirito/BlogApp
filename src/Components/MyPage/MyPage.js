import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPostsByAuthor, deletePostById } from "../../actions/myPageActions";
import _Router from "../../externalClasses/myRouter";
import PostForm from "./PostForm";
import Button from "@material-ui/core/Button";
import Preloader from "../Preloarer";

const mapDispatchToProps = dispatch => ({
  getPostsByAuthor: id => dispatch(getPostsByAuthor(id)),
  deletePostById: id => dispatch(deletePostById(id))
});

const mapStateToProps = state => {
  return {
    myPage: state.myPage,
    app: state.app,
    selectedUser: state.selectedUser
  };
};

const StyledPost = styled.div`
  display: block;
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
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 90%;
  height: 70%;
  overflow-y: auto;
`;

const AboutUserCardItem = styled.div`
  display: flex;
  text-align: center;
  width: 90%;
  padding: 10px 0;
  margin: 10px 0;
  box-shadow: 10px 10px 29px -8px rgba(0, 0, 0, 0.75);
`;

export const Post = ({ post, handleClick, handleDelete, isMyPage }) => {
  return (
    <StyledPost>
      <StyledHeader>{post.title}</StyledHeader>
      <StyledPostLine>{post.body}</StyledPostLine>
      <StyledPostLine>{post.category_name}</StyledPostLine>
      <Button onClick={() => handleClick(post.id)}>See More</Button>
      {isMyPage && (
        <>
          <Button onClick={() => _Router.goTo(`/post/${post.id}/edit`)}>
            Update
          </Button>
          <Button onClick={() => handleDelete(post.id)}>Delete Post</Button>
        </>
      )}
    </StyledPost>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-around;
`;

class MyPage extends Component {
  componentDidMount() {
    const id =
      this.processIncomingRoute(this.props.location) || this.props.app.user.id;
    this.props.getPostsByAuthor(id);
  }

  processIncomingRoute = route => {
    return route.pathname !== "/myAccount"
      ? this.props.match.params.id
      : this.props.app.user.id;
  };

  render() {
    const { posts, isLoading } = this.props.myPage;
    const id = this.processIncomingRoute(this.props.location);
    const isMyPage = this.props.app.user.id === id;
    return !isLoading ? (
      <Wrapper>
        <AboutUserCardItem>
          {`Hello, ${this.props.selectedUser.currentUser.login}`}
        </AboutUserCardItem>

        {isMyPage && <PostForm updatePosts={this.props.getPostsByAuthor} />}
        <StyledPostsContainer>
          {!isLoading &&
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  handleClick={id => {
                    _Router.goTo(`/post/${id}`);
                    console.log(id);
                  }}
                  handleDelete={this.props.deletePostById}
                  isMyPage={isMyPage}
                />
              );
            })}
        </StyledPostsContainer>
      </Wrapper>
    ) : (
      <Preloader />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);
