import styles from './style.module.scss';

import * as referralsApi from "../../../api/referrals/referrals.api";

import { useUserStore } from '../../../store/user.store';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { formatTimestamp } from '../../../utils/app';

// const data = Array.from({ length: 4 }, (_, i) => ({
//   id: i,
//   image: '/pages/home/gift.png',
//   name: 'Grankeyl',
//   date: '20 hours ago',
// }));

export const Items = () => {
  const { t } = useTranslation();
  const userDataMeta = useUserStore((s) => s.userDataMeta);
  const [items, setItems] = useState<any[]>([]);

  async function getItems() {
    const res = await referralsApi.history();
    setItems(res.items);
  }

  useEffect(() => {
    getItems();
  }, []);

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