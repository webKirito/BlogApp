import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getComments,
  deleteCommentById,
  pushComment
} from "../actions/commentsActions";
import { setComment } from "../actions/messageBoxActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Preloader from "./Preloarer";

const mapStateToProps = state => {
  return {
    comments: state.comment,
    app: state.app,
    currentComment: state.message
  };
};

const mapDispatchToProps = dispatch => ({
  getComments: id => dispatch(getComments(id)),
  deleteCommentById: id => dispatch(deleteCommentById(id)),
  pushComment: (id, data) => dispatch(pushComment(id, data)),
  setComment: msg => dispatch(setComment(msg))
});

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: 20px;
  padding: 20px;
  width: 90%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
`;

const StyledMessageContainer = styled.div`
  display: block;
  background-color: white;
  padding: 10px;
  width: 90%;
  height: 70%;
  overflow-y: auto;
`;

const NiceComment = styled.div`
  margin: 20px 0;
  width: 100%;
  word-wrap: break-word;
`;

const Comment = ({ comment, handleDelete, authorId }) => {
  const isMyComment = authorId === comment.author_id;

  return (
    <StyledMessage>
      <h3>{`RE <${comment.author_name}>:`}</h3>
      <NiceComment>{comment.body}</NiceComment>
      {isMyComment && (
        <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
      )}
    </StyledMessage>
  );
};

const NothingWasFound = () => {
  return (
    <StyledMessage>
      <NiceComment>There is no comment. Left one.</NiceComment>
    </StyledMessage>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 15%;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 35%;
  align-items: center;
  justify-content: space-around;
`;

class MessageBox extends Component {
  componentDidMount() {
    this.props.getComments(this.props.postId);
  }

  state = {
    body: ""
  };

  setComment = msg => {
    this.setState({
      ...this.state,
      body: msg
    });
  };

  render() {
    const { comments, isLoading } = this.props.comments;

    return !isLoading ? (
      <VerticalWrapper>
        <StyledMessageContainer className="Scroll">
          {comments.length ? (
            comments.map(comment => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  authorId={this.props.app.user.id}
                  handleDelete={this.props.deleteCommentById}
                />
              );
            })
          ) : (
            <NothingWasFound />
          )}
        </StyledMessageContainer>
        <Wrapper>
          <TextField
            margin="normal"
            variant="outlined"
            label="Comment"
            type="text"
            multiline={true}
            rows={2}
            fullWidth={true}
            onChange={e => this.setComment(e.target.value)}
          />
          <Button
            onClick={() => {
              this.props.pushComment(this.props.postId, {
                body: this.state.body,
                post_id: this.props.postId,
                author_id: this.props.app.user.id,
                author_name: this.props.app.user.login
              });
              this.setComment("");
            }}
          >
            Add Comment
          </Button>
        </Wrapper>
      </VerticalWrapper>
    ) : (
      <Preloader />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
