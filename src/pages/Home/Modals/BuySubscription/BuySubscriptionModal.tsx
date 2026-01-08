import styles from './style.module.scss';

import { ModalShell } from "../../../../components/modal/ModalShell";
import { useState } from 'react';

const featuresData = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  image: '/pages/home/gift.png',
  title: 'Speed up to 1 GB/s',
}));

const methodsData = [
  { id: 'sbp', title: 'СБП' },
  { id: 'send', title: '@send' },
  { id: 'stars', title: 'Stars' },
  { id: 'balance', title: 'Balance' },
];

export function BuySubscriptionModal({
  onClose,
  closing,
  onExited,
}: {
  planId: string;
  onClose: () => void;
  closing?: boolean;
  onExited?: () => void;
}) {
  const [methodActive, setMethodActive] = useState(methodsData[0].id);

  const handleMethodActive = (id: string) => {
    setMethodActive(id);
  };

  return (
    <ModalShell onClose={onClose} closing={closing} onExited={onExited}>
      <div className={styles.inner}>
        <div className={styles.context}>
          <div className={styles.head}>
            <div className={styles.image}>
              <img src="https://i.ibb.co.com/4Z2pTPPG/level.png" alt="logo" />
            </div>
          </div>

          <div className={styles.title}>
            <h4>1 month</h4>
          </div>

          <div className={styles.descr}>
            <p>VPN-subscription</p>
          </div>
        </div>

        <div className={styles.features}>
          {featuresData.map((x) => (
            <>
            <div className={styles.item} key={x.id}>
              <div className={styles.image}>
                <img src={x.image} alt="" />
              </div>
              <div className={styles.text}>
                <h4>{x.title}</h4>
              </div>
            </div>
            {x.id !== featuresData.length - 1 && <div className={styles.border}></div>}
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
          <button>
            <h4>Buy for 139.00р</h4>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}