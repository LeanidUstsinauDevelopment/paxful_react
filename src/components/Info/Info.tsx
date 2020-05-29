import React, {
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback,
  FunctionComponent,
} from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import cx from "classnames";

import Avatar from "../../base/Avatar/Avatar";
import Rating from "../../base/Rating/Rating";
import { IUser, IConversation, IState } from "../../types/types";
import * as userSelector from "../../redux/selectors/userSelector";
import * as conversationsSelector from "../../redux/selectors/conversationsSelector";
import * as conversationsActions from "../../redux/actions/conversationsAction";
import * as bitcoinSelector from "../../redux/selectors/bitcoinSelector";
import styles from "./Info.module.css";

interface IInfoProps {
  users: IUser[];
  user: IUser;
  conversations: IConversation[];
  changeConversationStatus: (id: number) => void;
  bitcoinRate: number;
}

const Info: FunctionComponent<IInfoProps> = (props: IInfoProps) => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<IConversation>();
  const [buyer, setBuyer] = useState<IUser>();
  const [seller, setSeller] = useState<IUser>();
  const [isBuyer, setIsBuyer] = useState(false);

  useEffect(() => {
    const conversation = conversationsSelector.getConversationById(
      props,
      +conversationId
    );
    const buyer = userSelector.getUserById(props, conversation?.buyerId);
    const seller = userSelector.getUserById(props, conversation?.sellerId);

    setIsBuyer(conversation?.buyerId === props.user.id);
    setConversation(conversation);
    setBuyer(buyer);
    setSeller(seller);
  }, [conversationId, props, props.user.id, props.users]);

  const bitcoinRate = useMemo(
    () => ((conversation?.amount || 0) / props.bitcoinRate).toFixed(4),
    [conversation, props.bitcoinRate]
  );
  const disableReleaseBitcoins = useMemo(
    () =>
      props.user.id !== conversation?.sellerId ||
      conversation?.status === "paid",
    [props.user.id, conversation]
  );

  const releaseBitcoins = useCallback(() => {
    props.changeConversationStatus(conversation?.id || 0);
  }, [conversation, props]);

  if (!conversation) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          You are trading with {`${isBuyer ? seller?.name : buyer?.name}`}
        </div>
        <div className={styles.subtitle}>Started 13 hours ago</div>
        <button
          className={cx(styles.button, { [styles.disabled]: disableReleaseBitcoins })}
          disabled={disableReleaseBitcoins}
          onClick={releaseBitcoins}
        >
          Release Bitcoins
        </button>
      </div>
      <div className={styles.grid}>
        <div>
          <Avatar src={isBuyer ? seller?.avatar : buyer?.avatar} />
          <Rating user={ isBuyer ? seller : buyer } />
        </div>
        <div>
          <div className={styles.title}># of trades</div>
          <div>4</div>
        </div>

        <div>
          <div className={styles.title}>Trade status</div>
          <div className={styles.status}>{conversation?.status}</div>
        </div>
        <div>
          <div className={styles.title}>Trade hash</div>
          <div>{conversation?.tradeHash}</div>
        </div>
        <div>
          <div className={styles.title}>Amount USD</div>
          <div>{conversation?.amount}</div>
        </div>
        <div>
          <div className={styles.title}>Amount BTC</div>
          <div>{bitcoinRate}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  users: userSelector.getUsers(state),
  user: userSelector.getCurrentUser(state),
  conversations: conversationsSelector.getConversations(state),
  bitcoinRate: bitcoinSelector.getBitcoinRate(state),
});

const mapDispatchToProps = {
  changeConversationStatus: conversationsActions.changeConversationStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Info));
