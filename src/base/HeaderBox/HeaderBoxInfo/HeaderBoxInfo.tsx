import React, { FunctionComponent, memo } from "react";

import Rating from "../../Rating/Rating";
import { IConversation, IUser } from "../../../types/types";
import styles from "./HeaderBoxInfo.module.css";

interface IHeaderBoxInfoProps {
  conversation?: IConversation;
  buyer?: IUser;
}

const HeaderBoxInfo: FunctionComponent<IHeaderBoxInfoProps> = (
  { conversation, buyer }: IHeaderBoxInfoProps,
) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.paymentMethod}>
        {conversation?.paymentMethod}
      </div>
      <Rating name={buyer?.name} user={buyer} />
    </div>
  );
};

export default memo(HeaderBoxInfo);