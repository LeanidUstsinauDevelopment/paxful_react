import React, {
  useState,
  useEffect,
  memo,
  FunctionComponent,
  useCallback,
} from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import HeaderBoxInfo from "./HeaderBoxInfo/HeaderBoxInfo";
import trashImage from "../../static/rubbish-can.svg";
import { IUser, IConversation, IState } from "../../types/types";
import * as userSelector from "../../redux/selectors/userSelector";
import * as conversationsSelector from "../../redux/selectors/conversationsSelector";
import * as conversationsAction from "../../redux/actions/conversationsAction";
import * as usersActions from "../../redux/actions/usersAction";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';

import styles from "./HeaderBox.module.css";

interface IHeaderBoxProps {
  user: IUser;
  users: IUser[];
  conversations: IConversation[];
  deleteConversation: (conversationId: number) => void;
  switchUser: (userId: number) => void;
  openConversationScreen?: (open: boolean) => void;
  openInfoScreen?: (open: boolean) => void;
}

const HeaderBox: FunctionComponent<IHeaderBoxProps> = (
  props: IHeaderBoxProps
) => {
  const { conversationId: params } = useParams();
  const conversationId = Number.parseInt(params, 10);
  const [conversation, setConversation] = useState<IConversation>();
  const [buyer, setBuyer] = useState<IUser>();
  const [seller, setSeller] = useState<IUser>();

  useEffect(() => {
    const conversation = conversationsSelector.getConversationById(
      props,
      conversationId
    );
    const buyer = userSelector.getUserById(props, conversation?.buyerId);
    const seller = userSelector.getUserById(props, conversation?.sellerId);

    setConversation(conversation);
    setBuyer(buyer);
    setSeller(seller);
  }, [
    conversationId,
    props,
    props.users,
    props.user.id
  ]);
  
  const deleteConversation = useCallback(() => {
    props.deleteConversation(conversationId);
  }, [conversationId, props]);

  const switchUser = useCallback(() => {
    props.switchUser(
      buyer?.id === props.user.id ? seller?.id || 0 : buyer?.id || 0
    );
  }, [props, seller, buyer]);

  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.xsButton}>
        <IconButton onClick={() => {
          if (props.openConversationScreen) {
            props.openConversationScreen(true);
          }
        }}>
          <MenuIcon />
        </IconButton>
      </div>
      <Link to="/" className={styles.binButton} onClick={deleteConversation}>
        <img src={trashImage} alt="delete" className={styles.bin} />
      </Link>
      <HeaderBoxInfo conversation={conversation} buyer={buyer} />
      <Link to="/" className={styles.switchButton} onClick={switchUser}>
        Switch user
      </Link>
      <div className={styles.xsButton}>
        <IconButton onClick={() => {
          if (props.openInfoScreen) {
            props.openInfoScreen(true);
          }
        }}>
          <InfoIcon />
        </IconButton>
      </div>
    </div>
    <div className={styles.line} />
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  user: userSelector.getCurrentUser(state),
  users: userSelector.getUsers(state),
  conversations: conversationsSelector.getConversations(state),
});

const mapDispatchToProps = {
  deleteConversation: conversationsAction.deleteConversation,
  switchUser: usersActions.switchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(HeaderBox));

