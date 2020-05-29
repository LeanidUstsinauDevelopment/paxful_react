import { createSelector } from "reselect";

export const getUsers = (state) => state.users;

export const getCurrentUser = createSelector([getUsers], (users) => {
  return users.find((user) => user.current);
});

export const getUserById = (state, id = 0) =>
  state.users.find((user) => user.id === id);
