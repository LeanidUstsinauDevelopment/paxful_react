import React, { useMemo, memo, FunctionComponent, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import cx from "classnames";

import Avatar from "../Avatar/Avatar";
import { IConversation, IUser, IState } from "../../types/types";
import * as userSelector from "../../redux/selectors/userSelector";
import * as bitcoinSelector from "../../redux/selectors/bitcoinSelector";
import * as conversationsAction from "../../redux/actions/conversationsAction";
import styles from "./ConversationItem.module.css";

interface IConversationItemProps {
  item: IConversation;
  user: IUser;
  buyer: IUser;
  seller: IUser;
  changeBuyerHasUnreadMessages: (id: number) => void;
  changeSellerHasUnreadMessages: (id: number) => void;
  bitcoinRate: number;
}

const ConversationItem: FunctionComponent<IConversationItemProps> = (
  { 
    item,
    user,
    seller,
    buyer, 
    bitcoinRate, 
    changeBuyerHasUnreadMessages,
    changeSellerHasUnreadMessages
  }: IConversationItemProps,
) => {
  const { conversationId } = useParams();
  const bitcoinPerItem = useMemo(
    () => (item.amount / bitcoinRate).toFixed(4),
    [bitcoinRate, item.amount]
  );

  const changeConversationStatus = useCallback(() => {
    if (user.id === seller.id && item.sellerHasNewMessages) {
      changeSellerHasUnreadMessages(item.id);
    } else if (user.id === buyer.id && item.buyerHasNewMessages) {
      changeBuyerHasUnreadMessages(item.id);
    }
  }, [user.id, seller.id, buyer.id, item, changeSellerHasUnreadMessages, changeBuyerHasUnreadMessages]);

  useEffect(() => {
    if (Number(conversationId) === item.id) {
      changeConversationStatus();
    }
  }, []);
  
  return (
    <>
      <Link
        to={`/${item.id}`}
        className={cx(styles.container, { [styles.selectedContainer]:
            +conversationId === item.id })}
        onClick={changeConversationStatus}
      >
        <div className={styles.xsHidden}>
            <div className={styles.wrapper}>
              <div
                className={cx(styles.indicator, { 
                  [styles.activeIndicator]: (user.id === seller.id && item.sellerHasNewMessages)
                    || (user.id === buyer.id && item.buyerHasNewMessages)
                })}
              />
              {user.id === seller.id && (
                <div className={styles.text}>{buyer.name} is buying</div>
              )}
            </div>

          <div className={styles.paymentMethod}>{item.paymentMethod}</div>
          <div className={styles.amount}>
            {item.amount} USD ({bitcoinPerItem} BTC)
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <Avatar src={user.id === seller.id
            ? buyer.avatar
            : seller.avatar} />
          <div
            className={
              item.status === "paid" ? styles.paid : styles.notPaid
            }
          >
            {item.status}
          </div>
        </div>
      </Link>
      <hr className={styles.line} />
    </>
  );
};

const mapStateToProps = (state: IState, ownProps: { item: IConversation }) => ({
  buyer: userSelector.getUserById(state, ownProps.item.buyerId),
  seller: userSelector.getUserById(state, ownProps.item.sellerId),
  user: userSelector.getCurrentUser(state),
  bitcoinRate: bitcoinSelector.getBitcoinRate(state),
});

const mapDispatchToProps = {
  changeBuyerHasUnreadMessages: conversationsAction.changeBuyerHasUnreadMessages,
  changeSellerHasUnreadMessages: conversationsAction.changeSellerHasUnreadMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ConversationItem));
