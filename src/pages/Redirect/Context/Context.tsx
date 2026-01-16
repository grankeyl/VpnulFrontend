import styles from './style.module.scss';

import { Lottie } from '../../../components/Lottie/Lottie';
import { useTranslation } from 'react-i18next';

import StickerAnimation from '../../../assets/redirect/sticker.json';

export const Context = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.context}>
      <div className={styles.head}>
        <div className={styles.image}>
          <Lottie
            className={styles.lottie}
            animationData={StickerAnimation}
          />
        </div>
      </div>

      <div className={styles.title}>
        <h4>{t('redirect.context.title')}</h4>
      </div>

      <div className={styles.descr}>
        <p>{t('redirect.context.description')}</p>
      </div>
    </div>
  );
};