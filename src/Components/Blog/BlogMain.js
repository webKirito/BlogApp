import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getPosts,
  getCategories,
  getItemsByCategory
} from "../../actions/blogActions";
import _Router from "../../externalClasses/myRouter";
import Preloader from "../Preloarer";

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategories: () => dispatch(getCategories()),
  getItemsByCategory: title => dispatch(getItemsByCategory(title))
});

const mapStateToProps = state => {
  return {
    blog: state.blog
  };
};

const StyledPost = styled.div`
  display: block;
  height: auto;
  flex-direction: column;
  background-color: white;
  margin: 20px 0;
  padding: 20px 0;
  border-radius: 10px;
  width: 70%;
  box-shadow: 10px 10px 29px -8px rgba(0, 0, 0, 0.75);
`;

const StyledPostLine = styled.div`
  border-bottom: 1px solid black;
  padding: 4px;
  height: 70px;
`;

const StyledHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 0;
  height: 70px;
`;

const StyledPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 80%;
  overflow-y: auto;
`;

const StyledCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  overflow-y: auto;
`;

const StyledCategoryItem = styled.div`
  padding: 20px 0;
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
  transition: all 0.3s ease;
  background-color: #d3d3d3;
  border-radius: 10px;
  box-shadow: 10px 10px 30px -6px rgba(0, 0, 0, 0.75);
  width: 90%;
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

const StyledBlogMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

export const Post = ({ post, handleClick }) => {
  return (
    <StyledPost onClick={() => handleClick(post.id)}>
      <StyledHeader>{post.title}</StyledHeader>
      <StyledPostLine>{post.body}</StyledPostLine>
      <StyledPostLine>{post.category_name}</StyledPostLine>
    </StyledPost>
  );
};

export const Categories = ({ categories }) => {
  return categories.map(category => {
    return <div key={category.id}>${category}</div>;
  });
};

class BlogMain extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {
    const { posts, isLoading, categories } = this.props.blog;
    return !isLoading ? (
      <StyledBlogMain>
        <StyledCategoryContainer>
          <StyledCategoryItem
            onClick={() => {
              this.props.getPosts();
            }}
          >
            Reset
          </StyledCategoryItem>
          {categories.length &&
            categories.map(category => {
              return (
                <StyledCategoryItem
                  key={category.id}
                  onClick={() => this.props.getItemsByCategory(category.title)}
                >
                  {category.title}
                </StyledCategoryItem>
              );
            })}
        </StyledCategoryContainer>
        <StyledPostsContainer>
          {posts.length &&
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  handleClick={id => {
                    _Router.goTo(`/post/${id}`);
                    console.log(id);
                  }}
                />
              );
            })}
        </StyledPostsContainer>
      </StyledBlogMain>
    ) : (
      <Preloader />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogMain);
