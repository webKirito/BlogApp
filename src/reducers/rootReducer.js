import formReducer from "./formReducer";
import appReducer from "./appReducer";
import routingReducer from "./routingReducer";
import blogReducer from "./blogReducer";
import postPageReducer from "./postPageReducer";
import myPageReducer from "./myPageReducer";
import editPageReducer from "./editPageReducer";
import commentsReducer from "./commentsReducer";
import selectedUserReducer from "./selectedUserReducer";
import messageBoxReducer from "./messageBoxReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  form: formReducer,
  app: appReducer,
  route: routingReducer,
  blog: blogReducer,
  postPage: postPageReducer,
  myPage: myPageReducer,
  editPage: editPageReducer,
  comment: commentsReducer,
  selectedUser: selectedUserReducer,
  message: messageBoxReducer
});

export default rootReducer;
