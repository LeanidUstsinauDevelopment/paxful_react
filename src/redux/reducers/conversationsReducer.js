import { CONVERSATIONS } from "../../constants/data";

export default (state = CONVERSATIONS, action) => {
  switch (action.type) {
    case "DELETE_CONVERSATION":
      return state.filter((conversation) => conversation.id !== action.payload);
    case "CHANGE_STATUS":
      return state.reduce(
        (acc, item) => [
          ...acc,
          {
            ...item,
            status: item.id === action.payload ? "paid" : item.status,
          },
        ],
        []
      );
      case "CHANGE_BUYER_HAS_UNREAD_MESSAGES":
        return state.reduce(
          (acc, item) => [
            ...acc,
            {
              ...item,
              buyerHasNewMessages:
                item.id === action.payload
                  ? !item.buyerHasNewMessages
                  : item.buyerHasNewMessages,
            },
          ],
          []
        );
        case "CHANGE_SELLER_HAS_UNREAD_MESSAGES":
        return state.reduce(
          (acc, item) => [
            ...acc,
            {
              ...item,
              sellerHasNewMessages:
                item.id === action.payload
                  ? !item.sellerHasNewMessages
                  : item.sellerHasNewMessages,
            },
          ],
          []
        );
    default:
      return state;
  }
};
