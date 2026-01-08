import styles from './style.module.scss';

// Icons
// import LockIcon from "../../../icons/Lock";

import { useUserStore } from '../../../store/user.store';

export const Context = () => {
  const userData = useUserStore((s) => s.userData);

  return (
    <div className={styles.context}>
      <div className={styles.head}>
        <div className={styles.image}>
          <img src={userData?.Photo} alt="logo" />
        </div>
        <div className={styles.stars}>
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className={styles.star} />
          ))}
        </div>
      </div>

      <div className={styles.title}>
        <h4>{userData?.Name}</h4>
      </div>

      <div className={styles.descr}>
        <p>not a subscriber</p>
      </div>

      {/* <div className={`${styles.descr} ${styles.subscribed}`}>
        <p>subscribed</p>
        <LockIcon />
      </div> */}
    </div>
  );
};