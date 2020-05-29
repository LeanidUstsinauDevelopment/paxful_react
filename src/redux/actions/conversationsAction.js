import { 
  DELETE_CONVERSATION,
  CHANGE_STATUS,
  CHANGE_BUYER_HAS_UNREAD_MESSAGES,
  CHANGE_SELLER_HAS_UNREAD_MESSAGES
} from "../../constants/actionTypes";

export const deleteConversation = (id) => (dispatch) => {
  dispatch({
    type: DELETE_CONVERSATION,
    payload: id,
  });
};

export const changeConversationStatus = (id) => (dispatch) => {
  dispatch({
    type: CHANGE_STATUS,
    payload: id,
  });
};

export const changeBuyerHasUnreadMessages = (id) => (dispatch) => {
  dispatch({
    type: CHANGE_BUYER_HAS_UNREAD_MESSAGES,
    payload: id,
  });
};

export const changeSellerHasUnreadMessages = (id) => (dispatch) => {
  dispatch({
    type: CHANGE_SELLER_HAS_UNREAD_MESSAGES,
    payload: id,
  });
};