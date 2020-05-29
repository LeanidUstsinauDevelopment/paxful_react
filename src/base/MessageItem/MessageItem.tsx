import React, { useMemo, memo, FunctionComponent } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import Avatar from "../Avatar/Avatar";
import { parseTime } from "../../helpers/utils";
import { IUser, IMessages, IState } from "../../types/types";
import * as userSelector from "../../redux/selectors/userSelector";
import styles from "./MessageItem.module.css";

interface IMessageItemProps {
  message: IMessages;
  user: IUser;
  buyer: IUser;
}

const MessageItem: FunctionComponent<IMessageItemProps> = (
  { message, user, buyer }: IMessageItemProps
) => {
  const isMine = useMemo(() => message.senderId === user.id, [
    message.senderId,
    user.id,
  ]);

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.container, { [styles.containerFromMe]: isMine })}
      >
        <div className={cx(styles.avatarContainer, { [styles.buyersAvatar]: !isMine })}>
          <Avatar src={isMine ? user.avatar : buyer.avatar} />
        </div>
        <p className={`${isMine ? styles.messageFromMe : styles.message}`}>
          {message.text}
        </p>
      </div>
      <p className={cx(styles.time, { [styles.alightRight]: isMine })}>
        {parseTime(message.time)}
      </p>
    </div>
  );
};

const mapStateToProps = (state: IState, ownProps: { message: IMessages }) => ({
  buyer: userSelector.getUserById(state, ownProps.message.senderId),
});

export default connect(mapStateToProps)(memo(MessageItem));
