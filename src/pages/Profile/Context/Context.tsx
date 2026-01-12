import styles from './style.module.scss';

// Icons
import LockIcon from "../../../icons/Lock";

import { useUserStore } from '../../../store/user.store';
import { useTranslation } from 'react-i18next';

export const Context = ({ subscribed }: { subscribed?: boolean }) => {
  const { t } = useTranslation();
  const userData = useUserStore((s) => s.userData);

  return (
    <div className={styles.context}>
      <div className={styles.head}>
        <div className={styles.image}>
          <img src={userData?.Photo} alt="logo" />
        </div>
        <div className={styles.stars}>
          {Array.from({ length: 70 }).map((_, i) => (
            <span key={i} className={styles.star} />
          ))}
        </div>
      </div>

      <div className={styles.title}>
        <h4>{userData?.Name}</h4>
      </div>

      {!subscribed && (
        <div className={styles.descr}>
          <p>{t('profile.context.notSubscriber')}</p>
        </div>
      )}

      {subscribed && (
        <div className={`${styles.descr} ${styles.subscribed}`}>
          <p>{t('profile.context.subscriber')}</p>
          <LockIcon />
        </div>
      )}
    </div>
  );
};