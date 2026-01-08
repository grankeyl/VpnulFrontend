import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

export const Block = () => {
  return (
    <div className={styles.block}>
        <div className={styles.image}>
            <img src="/pages/home/gift.png" alt="" />
        </div>
        <div className={styles.context}>
            <h4>Free subscription</h4>
            <p>For inviting a friend</p>
        </div>
        <div className={styles.chevrone}>
            <ChevroneRightIcon />
        </div>
    </div>
  );
};