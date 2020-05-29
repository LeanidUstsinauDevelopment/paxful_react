import React, { FunctionComponent, memo } from "react";

import { IUser } from "../../types/types";
import styles from "./Rating.module.css";

interface IProfileProps {
  user?: IUser,
  name?: string;
}

const Profile: FunctionComponent<IProfileProps> = (
  { user, name }: IProfileProps,
) => {
  return (
    <div className={styles.rating}>
      {name}
      <div className={styles.goodRating}>{`+${user?.goodRating}`}</div>
      /
      <div className={styles.badRating}>{`-${user?.badRating}`}</div>
    </div>
  );
};

export default memo(Profile);