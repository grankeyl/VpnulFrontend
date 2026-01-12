import styles from './style.module.scss';

import { ModalShell } from "../../../components/modal/ModalShell";
import { useState } from 'react';
import { formatTimeLocalized, getImageUrl } from '../../../utils/app';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../../store/user.store';

export function BuySubscriptionModal({
  onClose,
  closing,
  onExited,
  data,
}: {
  planId: string;
  onClose: () => void;
  closing?: boolean;
  onExited?: () => void;
  data?: any;
}) {
  const userData = useUserStore((s) => s.userData);
  const setUserData = useUserStore((s) => s.setUserData);
  const { t } = useTranslation();
  const featuresData = [
    {
      id: 1,
      image: getImageUrl('/bages/speed.svg'),
      title: t('home.modals.buySubscription.features.speed'),
    },
    {
      id: 2,
      image: getImageUrl('/bages/device.svg'),
      title: t('home.modals.buySubscription.features.device'),
    },
    {
      id: 3,
      image: getImageUrl('/bages/shield.svg'),
      title: t('home.modals.buySubscription.features.shield'),
    },
    {
      id: 4,
      image: getImageUrl('/bages/fast.svg'),
      title: t('home.modals.buySubscription.features.fast'),
    },
  ];
  const methodsData = [
    { id: 'sbp', title: t('home.modals.buySubscription.methods.sbp') },
    { id: 'send', title: t('home.modals.buySubscription.methods.send') },
    { id: 'stars', title: t('home.modals.buySubscription.methods.stars') },
    { id: 'balance', title: t('home.modals.buySubscription.methods.balance') }
  ];
  const [methodActive, setMethodActive] = useState(methodsData[0].id);

  const handleMethodActive = (id: string) => {
    setMethodActive(id);
  };

  const handleBuy = () => {
    onClose();
    setUserData({ ...userData, SubUUID: "213", SubActivated: true });
  };

  return (
    <ModalShell onClose={onClose} closing={closing} onExited={onExited}>
      <div className={styles.inner}>
        <div className={styles.context}>
          <div className={styles.head}>
            <div className={styles.image}>
              <img src={data.Image} alt="logo" />
            </div>
          </div>

          <div className={styles.title}>
            <h4>{formatTimeLocalized(data.hours, t)}</h4>
          </div>

          <div className={styles.descr}>
            <p>{t('home.modals.buySubscription.description')}</p>
          </div>
        </div>

        <div className={styles.features}>
          {featuresData.map((x, i) => (
            <>
            <div className={styles.item} key={x.id}>
              <div className={styles.image}>
                <img src={x.image} alt="" />
              </div>
              <div className={styles.text}>
                <h4>{x.title}</h4>
              </div>
            </div>
            {i !== featuresData.length - 1 && <div className={styles.border}></div>}
            </>
          ))}
        </div>

        <div className={styles.methods}>
          {methodsData.map((x) => (
            <div
              key={x.id}
              className={`${styles.item} ${x.id === methodActive ? styles.active : ''}`}
              onClick={() => handleMethodActive(x.id)}
            >
              <div className={styles.text}>
                <h4>{x.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buy}>
          <button onClick={handleBuy}>
            <h4>{t('home.modals.buySubscription.buy', { price: 139 })}</h4>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}