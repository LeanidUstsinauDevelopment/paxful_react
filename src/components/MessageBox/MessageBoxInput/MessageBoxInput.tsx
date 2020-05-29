import React, { FunctionComponent, memo, useCallback, useState } from "react";
import { connect } from "react-redux";

import { IConversation, IMessages, IState, IUser } from "../../../types/types";
import * as userSelector from "../../../redux/selectors/userSelector";
import * as messagesActions from "../../../redux/actions/messagesAction";
import * as conversationsAction from "../../../redux/actions/conversationsAction";
import styles from "./MessageBoxInput.module.css";

interface IMessageBoxInputProps {
  user: IUser,
  addMessage: (message: IMessages) => void;
  changeBuyerHasUnreadMessages: (id: number) => void;
  changeSellerHasUnreadMessages: (id: number) => void;
  conversation?: IConversation;
}

const MessageBoxInput: FunctionComponent<IMessageBoxInputProps> = (
  props: IMessageBoxInputProps
) => {
  const [inputValue, setInputValue] = useState("");

  const addMessage = useCallback(() => {
    if (!inputValue || !props.conversation) return;

    const message = {
      conversationId: props.conversation.id,
      senderId: props.user.id,
      text: inputValue,
      time: Math.round(new Date().getTime() / 1000),
    };

    props.addMessage(message);

    if (props.conversation.buyerId === props.user.id) {
      props.changeSellerHasUnreadMessages(props.conversation.id);
    } else if (props.conversation.sellerId === props.user.id) {
      props.changeBuyerHasUnreadMessages(props.conversation.id);
    }

    setInputValue("");
  }, [inputValue, props]);

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []);

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Type your message..."
        className={styles.input}
        value={inputValue}
        onChange={onChange}
      />
      <button className={styles.button} onClick={addMessage}>
        SEND
      </button>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  user: userSelector.getCurrentUser(state),
});

const mapDispatchToProps = {
  addMessage: messagesActions.addMessage,
  changeBuyerHasUnreadMessages: conversationsAction.changeBuyerHasUnreadMessages,
  changeSellerHasUnreadMessages: conversationsAction.changeSellerHasUnreadMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(MessageBoxInput));