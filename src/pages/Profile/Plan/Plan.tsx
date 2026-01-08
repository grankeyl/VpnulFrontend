import styles from './style.module.scss';

import LockIcon from "../../../icons/Lock";
import AddIcon from "../../../icons/Add";
import CopyIcon from "../../../icons/Copy";

export const Plan = () => {
  return (
    <div className={styles.plan}>
      <div className={styles.context}>
        <div className={styles.icon}>
          <LockIcon />
        </div>
        <div className={styles.value}>
          <h4>48</h4>
        </div>
        <div className={styles.text}>
          <p>days</p>
        </div>
      </div>

      <div className={styles.descr}>
        <p>your subscription</p>
      </div>

      <div className={styles.buttons}>
        <div className={styles.button}>
          <button>
            <AddIcon />
            <h4>Add</h4>
          </button>
        </div>
        <div className={styles.button}>
          <button>
            <CopyIcon />
            <h4>Key</h4>
          </button>
        </div>
      </div>
    </div>
  );
};