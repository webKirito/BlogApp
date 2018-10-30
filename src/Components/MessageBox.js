import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getComments,
  deleteCommentById,
  pushComment
} from "../actions/commentsActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Preloader from "./Preloarer";

const mapStateToProps = state => {
  return {
    comments: state.comment,
    app: state.app
  };
};

const mapDispatchToProps = dispatch => ({
  getComments: id => dispatch(getComments(id)),
  deleteCommentById: id => dispatch(deleteCommentById(id)),
  pushComment: (id, data) => dispatch(pushComment(id, data))
});

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 70%;
  box-shadow: 10px 10px 29px -8px rgba(0, 0, 0, 0.75);
`;

const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  background-color: white;
  width: 80vw;
`;

const Comment = ({ comment, handleDelete, authorId }) => {
  console.log(comment);
  return (
    <StyledMessage>
      <div>{comment.body}</div>
      {authorId === comment.author_id && (
        <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
      )}
    </StyledMessage>
  );
};

const AddCommentInput = ({ user, postId, value, handleAdd, handleChange }) => {
  return (
    <div>
      <TextField
        margin="normal"
        variant="outlined"
        label="Email"
        type="text"
        onChange={e => handleChange(e.target.value)}
      />
      <Button
        onClick={() =>
          handleAdd(postId, {
            body: value,
            post_id: postId,
            author_id: user.id,
            author_name: user.login
          })
        }
      >
        Add Comment
      </Button>
    </div>
  );
};

class MessageBox extends Component {
  componentDidMount() {
    this.props.getComments(this.props.postId);
  }

  state = {
    body: ""
  };

  render() {
    const { comments, isLoading } = this.props.comments;
    console.log("Comments", this.state);
    return !isLoading ? (
      <StyledMessageContainer>
        {comments.length &&
          comments.map(comment => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                authorId={this.props.app.user.id}
                handleDelete={this.props.deleteCommentById}
              />
            );
          })}
        <AddCommentInput
          postId={this.props.postId}
          user={this.props.app.user}
          value={this.state.body}
          handleAdd={this.props.pushComment}
          handleChange={body => this.setState({ body })}
        />
      </StyledMessageContainer>
    ) : (
      <Preloader />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
