import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import conversationsReducer from "./conversationsReducer";
import usersReducer from "./usersReducer";
import bitcoinReducer from "./bitcoinReducer";

export default combineReducers({
  messages: messageReducer,
  conversations: conversationsReducer,
  users: usersReducer,
  bitcoin: bitcoinReducer,
});
