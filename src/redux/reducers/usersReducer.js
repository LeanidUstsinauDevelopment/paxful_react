import { USERS } from "../../constants/data";

export default (state = USERS, action) => {
  switch (action.type) {
    case "SWITCH_USER":
      return state.map(user => ({
        ...user,
        current: user.id === action.payload,
      }));
    default:
      return state;
  }
};
