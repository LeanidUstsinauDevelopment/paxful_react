import React, { FunctionComponent, memo } from "react";

import styles from "./Avatar.module.css";

interface IAvatarProps {
  src?: string;
}

const Avatar: FunctionComponent<IAvatarProps> = (
  { src }: IAvatarProps,
) => (
  <img
    src={src}
    alt="avatar"
    className={styles.avatar}
  />
);

export default memo(Avatar);