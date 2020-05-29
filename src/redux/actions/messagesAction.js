import { ADD_MESSAGE } from "../../constants/actionTypes";

export const addMessage = (message) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE,
    payload: message,
  });
};
