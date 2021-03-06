import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getPosts,
  getCategories,
  getItemsByCategory
} from "../../actions/blogActions";
import { selectUser } from "../../actions/selectUserActions";
import _Router from "../../externalClasses/myRouter";
import Preloader from "../Preloarer";
import PropTypes from "prop-types";

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategories: () => dispatch(getCategories()),
  getItemsByCategory: title => dispatch(getItemsByCategory(title)),
  selectUser: user => dispatch(selectUser(user))
});

const mapStateToProps = state => {
  return {
    blog: state.blog,
    app: state.app
  };
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
  position: relative;
  margin: 20px 0;
  width: 70%;
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

const StyledCategoryRandomItem = styled.div`
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
  width: 60%;
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
  background-color: #c158dc;
  color: white;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
  width: 90%;
  transition: all ease-out 0.1s;
  &:hover {
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.75);
    background-color: #5c007a;
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
  margin-top: 30px;
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
  color: white;
  cursor: pointer;
`;

const NiceDate = styled.div`
  width: 100%;
  text-align: right;
  font-size: 1.1rem;
  color: #531663;
`;

const Avatar = ({ name, handleUserClick }) => {
  const shortName = name.charAt(0) + name.charAt(name.length - 1);
  return (
    <StyledAvatar
      onClick={() => handleUserClick()}
      color={stringToColour(shortName)}
    >
      <div>{shortName.toUpperCase()}</div>
    </StyledAvatar>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  handleUserClick: PropTypes.func.isRequired
};

const NothingWasFound = () => {
  return (
    <StyledPost>
      <StyledCategoryRandomItem />
      <StyledPostLine>Nothing was found by your request!</StyledPostLine>
    </StyledPost>
  );
};

export const Post = ({ post, handleClick, handleUserClick, date }) => {
  return (
    <StyledPost>
      <StyledCategoryRandomItem>{post.category_name}</StyledCategoryRandomItem>
      <Wrap>
        <StyledHeader onClick={() => handleClick(post.id)}>
          <div>{post.title}</div>
        </StyledHeader>
        <Avatar
          name={post.author_name || "IU"}
          handleUserClick={() =>
            handleUserClick({ id: post.author_id, login: post.author_name })
          }
        />
      </Wrap>
      <StyledPostLine>{post.body}</StyledPostLine>
      <NiceDate>{date}</NiceDate>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    category_id: PropTypes.string.isRequired
  }).isRequired,
  handleUserClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

class BlogMain extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  handleUserClick = user => {
    this.props.selectUser(user);
    const route =
      this.props.app.user.id === user.id ? "/myAccount" : `/author/${user.id}`;
    _Router.goTo(route);
  };

  niceDate = seconds => {
    return new Date(seconds).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

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
          {posts.length ? (
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  handleClick={id => {
                    _Router.goTo(`/post/${id}`);
                    console.log(id);
                  }}
                  handleUserClick={this.handleUserClick}
                  date={this.niceDate(post.posted_at)}
                />
              );
            })
          ) : (
            <NothingWasFound />
          )}
        </StyledPostsContainer>
      </StyledBlogMain>
    ) : (
      <Preloader />
    );
  }
}

BlogMain.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author_id: PropTypes.string.isRequired,
        author_name: PropTypes.string.isRequired,
        category_name: PropTypes.string.isRequired,
        category_id: PropTypes.string.isRequired
      })
    ).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogMain);
