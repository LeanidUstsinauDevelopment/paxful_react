import { SWITCH_USER } from "../../constants/actionTypes";

export const switchUser = (id) => (dispatch) => {
  dispatch({
    type: SWITCH_USER,
    payload: id,
  });
};
