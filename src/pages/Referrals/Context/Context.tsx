import styles from './style.module.scss';

import { Lottie } from '../../../components/Lottie/Lottie';

import StickerAnimation from '../../../assets/referrals/sticker.json';

export const Context = () => {
  return (
    <div className={styles.context}>
      <div className={styles.head}>
        <div className={styles.image}>
          <Lottie
            className={styles.lottie}
            animationData={StickerAnimation}
          />
        </div>
        <div className={styles.stars}>
          {Array.from({ length: 70 }).map((_, i) => (
            <span key={i} className={styles.star} />
          ))}
        </div>
      </div>

      <div className={styles.title}>
        <h4>Referrals</h4>
      </div>

      <div className={styles.descr}>
        <p>Earn 30% of your refferal purchases</p>
      </div>
    </div>
  );
};