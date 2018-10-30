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
  height: 25vh;
`;

const StyledInput = styled(TextField)`
  width: 90%;
  margin-top: 20px;
  font-size: 20px;
`;

const StyledFromControl = styled(FormControl)`
  width: 90%;
  margin: 20px 0;
  font-size: 20px;
`;

const Dropdown = ({ items, handleDropwownChange, value, defaultValue }) => {
  return (
    <StyledFromControl margin="normal">
      <InputLabel htmlFor="category">Category</InputLabel>
      <Select
        value={value || defaultValue || ""}
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
        <StyledInput
          margin="normal"
          variant="outlined"
          label="Title"
          onChange={e =>
            this.setState({ ...this.state, title: e.target.value })
          }
          defaultValue={post.title || ""}
        />
        <StyledInput
          multiline={true}
          margin="normal"
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
              defaultValue={post.category_name}
              value={this.state.category.title}
            />
            <Button
              onClick={() =>
                this.props.updatePost({
                  ...post,
                  title: this.state.title || post.title,
                  body: this.state.body || post.title,
                  category_id: this.state.category.id,
                  category_name: this.state.category.title
                })
              }
            >
              Update
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
