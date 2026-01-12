import styles from './style.module.scss';

import { useUserStore } from '../../../store/user.store';
import { useTranslation } from 'react-i18next';

// const data = Array.from({ length: 4 }, (_, i) => ({
//   id: i,
//   image: '/pages/home/gift.png',
//   name: 'Grankeyl',
//   date: '20 hours ago',
// }));

export const Items = () => {
  const { t } = useTranslation();
  const userDataMeta = useUserStore((s) => s.userDataMeta);

  return (
    <div className={styles.items}>
      <div className={styles.head}>
        <h4>{t('referrals.items.head.title')}</h4>
        <p>{userDataMeta?.ref_count}</p>
      </div>
      {/* <div className={styles.list}>
          {data.map((x) => (
            <>
            <div className={styles.item} key={x.id}>
              <div className={styles.image}>
                <img src={x.image} alt="" />
              </div>
              <div className={styles.text}>
                <h4>{x.name}</h4>
                <div className={styles.descr}>
                  <p>{x.date}</p>
                </div>
              </div>
              <div className={styles.info}>
                <p>+40р</p>
              </div>
            </div>
            {x.id !== data.length - 1 && <div className={styles.border}></div>}
            </>
          ))}
      </div> */}
    </div>
  );
};