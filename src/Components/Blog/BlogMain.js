import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
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

const rand = (left, right) => {
  return Math.floor(Math.random() * (right - left + 1)) + left;
};

const stringToColour = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) * 23 + ((hash << 5) - hash) / 2;
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

const StyledPost = styled.div`
  display: block;
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
  height: 30px;
`;

const StyledCategoryRandomItem = styled.div`
  padding: 8px;
  background-color: ${props => props.color};
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

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledAvatar = styled.div`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  text-align: center;
  background-color: ${props => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
const Avatar = ({ name }) => {
  const shortName = name.charAt(0) + name.charAt(name.length - 1);
  return (
    <StyledAvatar color={stringToColour(shortName)}>
      <div>{shortName.toUpperCase()}</div>
    </StyledAvatar>
  );
};

export const Post = ({ post, handleClick }) => {
  return (
    <StyledPost onClick={() => handleClick(post.id)}>
      <Wrap>
        <StyledHeader>
          <div>{post.title}</div>
        </StyledHeader>
        <Avatar name={post.author_name} />
      </Wrap>
      <StyledCategoryRandomItem color={stringToColour(post.category_name)}>
        {post.category_name}
      </StyledCategoryRandomItem>
      <StyledPostLine>{post.body}</StyledPostLine>
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
        <StyledCategoryContainer className="Scroll">
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
        <StyledPostsContainer className="Scroll">
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
