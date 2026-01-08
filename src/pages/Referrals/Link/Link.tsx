import styles from './style.module.scss';

import CopyIcon from "../../../icons/Copy";

export const Link = () => {
  return (
    <div className={styles.link}>
      <div className={styles.head}>
        <p>Your referral link</p>
      </div>
      <div className={styles.block}>
        <div className={styles.left}>
          <h4>https://t.me/VPNulBot?startapp=ref_BTUSQJ</h4>
          <CopyIcon />
        </div>
        <div className={styles.right}>
          <div className={styles.button}>
            <button>
              <h4>Share</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};