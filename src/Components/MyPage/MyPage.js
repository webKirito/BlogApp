import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPostsByAuthor, deletePostById } from "../../actions/myPageActions";
import { selectUser } from "../../actions/selectUserActions";
import _Router from "../../externalClasses/myRouter";
import PostForm from "./PostForm";
import Button from "@material-ui/core/Button";
import Preloader from "../Preloarer";

const mapDispatchToProps = dispatch => ({
  getPostsByAuthor: id => dispatch(getPostsByAuthor(id)),
  deletePostById: id => dispatch(deletePostById(id)),
  selectUser: user => dispatch(selectUser(user))
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
  width: 70%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
`;

const StyledPostLine = styled.div`
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
  margin-top: 20px;
  padding: 10px;
  width: 60%;
  height: 90%;
  overflow-y: auto;
`;

const AboutUserCardItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  margin: 30px 0;
  height: 20%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const Post = ({ post, handleClick, handleDelete, isMyPage }) => {
  return (
    <StyledPost>
      <StyledHeader>{post.title}</StyledHeader>
      <StyledPostLine>{post.body}</StyledPostLine>
      <StyledPostLine>{post.category_name}</StyledPostLine>
      <ButtonContainer>
        <Button onClick={() => handleClick(post.id)}>See More</Button>
        {isMyPage && (
          <>
            <Button onClick={() => _Router.goTo(`/post/${post.id}/edit`)}>
              Update
            </Button>
            <Button onClick={() => handleDelete(post.id)}>Delete Post</Button>
          </>
        )}
      </ButtonContainer>
    </StyledPost>
  );
};

const NoPostsCard = styled.div`
  width: 100%;
  padding: 20px 0;
  text-align: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
`;

const NoPosts = () => {
  return <NoPostsCard>There are no posts. Make one!</NoPostsCard>;
};

const HorizontalWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-around;
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 35%;
  align-items: center;
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

  componentWillUnmount() {
    this.props.selectUser({});
  }

  render() {
    const { posts, isLoading } = this.props.myPage;
    const id = this.processIncomingRoute(this.props.location);
    const isMyPage = this.props.app.user.id === id;
    return !isLoading ? (
      <HorizontalWrapper>
        <VerticalWrapper>
          <AboutUserCardItem>
            <div>{`Hello, ${this.props.selectedUser.currentUser.login}`}</div>
          </AboutUserCardItem>

          {isMyPage && <PostForm updatePosts={this.props.getPostsByAuthor} />}
        </VerticalWrapper>
        <StyledPostsContainer className="Scroll">
          {!isLoading &&
            (posts.length ? (
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
              })
            ) : (
              <NoPosts />
            ))}
        </StyledPostsContainer>
      </HorizontalWrapper>
    ) : (
      <Preloader />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);
