import React, { memo, FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import ConversationItem from "../../base/ConversationItem/ConversationItem";
import { IUser, IConversation, IState } from "../../types/types";
import * as conversationsSelector from "../../redux/selectors/conversationsSelector";
import * as userSelector from "../../redux/selectors/userSelector";
import * as conversationsAction from "../../redux/actions/conversationsAction";
import styles from "./Conversation.module.css";

interface IConversationProps {
  conversations: IConversation[];
  user: IUser;
  users: IUser[];
  changeBuyerHasUnreadMessages: (id: number) => void;
  changeSellerHasUnreadMessages: (id: number) => void;
}

const Conversation: FunctionComponent<IConversationProps> = (
  props: IConversationProps
) => {
  const { conversationId } = useParams();
  const history = useHistory();
  const { user, conversations, changeBuyerHasUnreadMessages, changeSellerHasUnreadMessages } = props;

  useEffect(() => {
    const conversationsIds = conversations.map(conversation => Number(conversation.id));
    
    if (conversations.length && (!conversationId || !conversationsIds.includes(Number(conversationId)))) {
      if (user.id === conversations[0].sellerId && conversations[0].sellerHasNewMessages) {
        changeSellerHasUnreadMessages(conversations[0].id);
      } else if (user.id === conversations[0].buyerId && conversations[0].buyerHasNewMessages) {
        changeBuyerHasUnreadMessages(conversations[0].id);
      }

      history.push(`/${conversations[0].id}`);
    }
  }, []);

  return (
    <div className={styles.container}>
      {conversations.map((item, index) => (
        <ConversationItem key={`conversation-item-${index}`} item={item} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  conversations: conversationsSelector.getConversations(state),
  user: userSelector.getCurrentUser(state),
  users: userSelector.getUsers(state),
});

const mapDispatchToProps = {
  changeBuyerHasUnreadMessages: conversationsAction.changeBuyerHasUnreadMessages,
  changeSellerHasUnreadMessages: conversationsAction.changeSellerHasUnreadMessages,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(memo(Conversation));
