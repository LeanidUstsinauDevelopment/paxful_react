import { MESSAGES } from "../../constants/data";

export default (state = MESSAGES, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [action.payload, ...state];
    default:
      return state;
  }
};
