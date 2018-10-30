import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { API_LINK } from "../../config";
import Preloader from "../Preloarer";

import Button from "@material-ui/core/Button";
import { getCategories } from "../../actions/blogActions";
import axios from "axios";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories())
});

const mapStateToProps = state => {
  return {
    app: state.app,
    blog: state.blog
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

const Dropdown = ({ items, handleDropwownChange, defaultValue }) => {
  return (
    <StyledFromControl margin="normal">
      <InputLabel htmlFor="category">Category</InputLabel>
      <Select
        value={defaultValue}
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

class PostForm extends Component {
  componentDidMount() {
    if (!this.state.category.title) {
      this.props.getCategories();
    }
  }

  state = {
    title: "",
    body: "",
    category: {
      title: ""
    }
  };

  setDropdownValue = category => {
    this.setState({
      category
    });
  };

  sendPost = (user, category) => {
    axios
      .post(
        `${API_LINK}/post`,
        {
          title: this.state.title,
          body: this.state.body,
          author_id: user.id,
          author_name: user.login,
          category_id: category.id,
          category_name: category.title
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(res => {
        this.props.updatePosts(user.id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { isLoading, categories } = this.props.blog;
    const { user } = this.props.app;
    console.log(user);
    return (
      <FormCard>
        <StyledInput
          margin="normal"
          variant="outlined"
          label="Title"
          onChange={e =>
            this.setState({ ...this.state, title: e.target.value })
          }
        />
        <StyledInput
          multiline={true}
          margin="normal"
          variant="outlined"
          label="Body"
          onChange={e => this.setState({ ...this.state, body: e.target.value })}
        />
        {!isLoading ? (
          <>
            <Dropdown
              items={categories}
              handleDropwownChange={this.setDropdownValue}
              defaultValue={this.state.category.title}
            />
            <Button onClick={() => this.sendPost(user, this.state.category)}>
              Submit
            </Button>
          </>
        ) : (
          <Preloader />
        )}
      </FormCard>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
