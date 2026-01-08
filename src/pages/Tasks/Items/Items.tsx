import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

const funcsData = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  image: '/pages/home/gift.png',
  title: 'How to use',
}));

export const Items = () => {
  return (
    <div className={styles.items}>
        {funcsData.map((x) => (
          <>
          <div className={styles.item} key={x.id}>
            <div className={styles.image}>
              <img src={x.image} alt="" />
            </div>
            <div className={styles.text}>
              <h4>{x.title}</h4>
              <div className={styles.descr}>
                <p>7 days subscription</p>
              </div>
            </div>
            <div className={styles.chevrone}>
              <ChevroneRightIcon />
            </div>
          </div>
          {x.id !== funcsData.length - 1 && <div className={styles.border}></div>}
          </>
        ))}
    </div>
  );
};