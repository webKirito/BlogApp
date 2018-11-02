import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import { getPost, updatePost } from "../../actions/editPageActions";
import { getCategories } from "../../actions/blogActions";
import Preloader from "../Preloarer";
import _Router from "../../externalClasses/myRouter";

import PropTypes from "prop-types";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  getPost: id => dispatch(getPost(id)),
  updatePost: post => dispatch(updatePost(post))
});

const mapStateToProps = state => {
  return {
    blog: state.blog,
    editPage: state.editPage
  };
};

const FormCard = styled.div`
  margin-top: 20px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 10px 10px 26px -6px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const StyledFromControl = styled(FormControl)`
  width: 90%;
`;

const Dropdown = ({ items, handleDropwownChange, value }) => {
  return (
    <StyledFromControl margin="normal">
      <InputLabel htmlFor="category">Category</InputLabel>
      <Select
        value={value}
        onChange={e =>
          handleDropwownChange(
            items.find(item => item.title === e.target.value)
          )
        }
        inputProps={{
          name: "category",
          id: "category"
        }}
      >
        {items.map(category => {
          return (
            <MenuItem key={category.id} value={category.title}>
              {category.title}
            </MenuItem>
          );
        })}
      </Select>
    </StyledFromControl>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  handleDropwownChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

class EditForm extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!this.state.category.title) {
      this.props.getCategories();
    }
    this.props.getPost(id);
  }

  state = {
    title: "",
    body: "",
    category: {
      title: ""
    },
    postIsLoaded: false
  };

  setDropdownValue = category => {
    this.setState({
      category
    });
  };

  render() {
    const { isLoading, categories } = this.props.blog;
    const { post } = this.props.editPage;
    const formIsLoading = this.props.editPage.isLoading;
    return !formIsLoading ? (
      <FormCard>
        <TextField
          margin="normal"
          variant="outlined"
          label="Title"
          fullWidth
          onChange={e =>
            this.setState({ ...this.state, title: e.target.value })
          }
          defaultValue={post.title || ""}
        />
        <TextField
          multiline
          rows={20}
          margin="normal"
          fullWidth
          variant="outlined"
          label="Body"
          onChange={e => this.setState({ ...this.state, body: e.target.value })}
          defaultValue={post.body || ""}
        />
        {!isLoading && (
          <>
            <Dropdown
              items={categories}
              handleDropwownChange={this.setDropdownValue}
              value={this.state.category.title || post.category_name || ""}
            />
            <Button
              onClick={() =>
                this.props.updatePost({
                  ...post,
                  title: this.state.title || post.title,
                  body: this.state.body || post.body,
                  category_id: this.state.category.id,
                  category_name: this.state.category.title
                })
              }
            >
              Update
            </Button>
            <Button color="secondary" onClick={() => _Router.goBack()}>
              Cancel
            </Button>
          </>
        )}
      </FormCard>
    ) : (
      <Preloader />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);
