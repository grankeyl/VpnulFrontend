import styles from './style.module.scss';

import { useUserStore } from '../../../store/user.store';
import { useTranslation } from 'react-i18next';
import { formatTimestamp } from '../../../utils/app';

export const Items = ({ items }: { items: any[] }) => {
  const { t } = useTranslation();
  const userDataMeta = useUserStore((s) => s.userDataMeta);

  return (
    <div className={styles.items}>
      <div className={styles.head}>
        <h4>{t('referrals.items.head.title')}</h4>
        <p>{userDataMeta?.ref_count}</p>
      </div>
      <div className={styles.list}>
          {items.map((x, i) => (
            <>
            <div className={styles.item} key={i}>
              <div className={styles.image}>
                <img src={x.referral_photo} alt="" />
              </div>
              <div className={styles.text}>
                <h4>{x.referral_name}</h4>
                <div className={styles.descr}>
                  <p>{formatTimestamp(x.timestamp)}</p>
                </div>
              </div>
              <div className={styles.info}>
                <p>+{x.amount}р</p>
              </div>
            </div>
            {i !== items.length - 1 && <div className={styles.border}></div>}
            </>
          ))}
      </div>
    </div>
  );
};