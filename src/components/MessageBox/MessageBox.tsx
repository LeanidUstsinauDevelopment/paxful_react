import React, {
  useState,
  useEffect,
  memo,
  FunctionComponent
} from "react";
import { connect } from "react-redux";
import { useParams} from "react-router-dom";

import HeaderBox from "../../base/HeaderBox/HeaderBox";
import MessageBoxInput from "./MessageBoxInput/MessageBoxInput";
import MessageItem from "../../base/MessageItem/MessageItem";
import * as messagesSelector from "../../redux/selectors/messagesSelector";
import * as userSelector from "../../redux/selectors/userSelector";
import * as conversationsSelector from "../../redux/selectors/conversationsSelector";
import { IMessages, IUser, IConversation, IState } from "../../types/types";
import styles from "./MessageBox.module.css";

interface IMessageBoxProps {
  messages: IMessages[];
  user: IUser;
  conversations: IConversation[];
  users: IUser[];
}

const MessageBox: FunctionComponent<IMessageBoxProps> = (
  props: IMessageBoxProps
) => {
  const { conversationId: params } = useParams();
  const conversationId = Number.parseInt(params, 10);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [conversation, setConversation] = useState<IConversation>();

  useEffect(() => {
    const messages = props.messages.filter(
      (message) => message.conversationId === conversationId
    );
    const conversation = conversationsSelector.getConversationById(
      props,
      conversationId
    );

    setMessages(messages);
    setConversation(conversation);
  }, [
    conversationId,
    props,
    props.user.id,
    props.users,
    props.messages,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.xsHidden}>
        <HeaderBox />
      </div>
      {messages
        .map((message, index) => (
          <MessageItem
            key={`message-item-${index}`}
            message={message}
            user={props.user}
          />
        ))}
      <MessageBoxInput conversation={conversation} />
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  messages: messagesSelector.getMessages(state),
  user: userSelector.getCurrentUser(state),
  users: userSelector.getUsers(state),
  conversations: conversationsSelector.getConversations(state),
});

export default connect(mapStateToProps)(memo(MessageBox));
