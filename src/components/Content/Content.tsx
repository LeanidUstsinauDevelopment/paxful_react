import React, { useCallback, useState, useEffect, memo, FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Conversation from "../Conversation/Conversation";
import MessageBox from "../MessageBox/MessageBox";
import Info from "../Info/Info";
import { getRandomNumber } from "../../helpers/utils";
import * as bitcoinAction from "../../redux/actions/bitcoinAction";
import styles from "./Content.module.css";
import HeaderBox from "../../base/HeaderBox/HeaderBox";
import Drawer from '@material-ui/core/Drawer';

interface IContent {
  getBitcoinRate: () => void;
}

const Content: FunctionComponent<IContent> = (props: IContent) => {
  const [showConversation, setShowConversation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const fetchData = useCallback(() => {
    props.getBitcoinRate();
    setTimeout(fetchData, getRandomNumber(10000, 60000));
  }, [props]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Switch>
        <Route path="/" exact>
        <div className={styles.content}>
          <div className={styles.emptyMessages}>There are no conversations</div>
          <Conversation />
        </div>
        </Route>
        <Route path="/:conversationId">
          <div className={styles.lgHidden}>
            <HeaderBox 
              openConversationScreen={setShowConversation}
              openInfoScreen={setShowInfo}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.xsHidden}>
              <Conversation />
            </div>
            <div className={styles.lgHidden}>
              <Drawer anchor="left" open={showConversation} onClose={() => {setShowConversation(false)}}>
                <Conversation />
              </Drawer>
            </div>
            <MessageBox />
            <div className={styles.xsHidden}>
              <Info />
            </div>
            <div className={styles.lgHidden}>
              <Drawer anchor="right" open={showInfo} onClose={() => {setShowInfo(false)}}>
                <Info />
              </Drawer>
            </div>
          </div>
        </Route>
      </Switch>
    </>
  );
};

const mapDispatchToProps = {
  getBitcoinRate: bitcoinAction.getBitcoinData,
};

export default connect(null, mapDispatchToProps)(memo(Content));
