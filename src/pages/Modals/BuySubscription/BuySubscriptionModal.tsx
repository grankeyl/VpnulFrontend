import styles from './style.module.scss';

import * as userApi from "../../../api/user/user.api";
import * as paymentApi from "../../../api/payment/payment.api";

import CloseIcon from "../../../icons/Close";

import { ModalShell } from "../../../components/modal/ModalShell";
import { useState } from 'react';
import { formatTimeLocalized, getImageUrl } from '../../../utils/app';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../../store/user.store';
import { showErrorToast } from '../../../components/Toast/toastManager';

import TelegramModule from '../../../hooks/useTelegram';

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
  const setSubscriptionData = useUserStore((s) => s.setSubscriptionData);

  const { t } = useTranslation();
  const [buyButtonLoading, setBuyButtonLoading] = useState(false);
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
    { id: 'sbp', title: t('home.modals.buySubscription.methods.sbp'), soon: false },
    { id: 'send', title: t('home.modals.buySubscription.methods.send'), soon: false },
    { id: 'stars', title: t('home.modals.buySubscription.methods.stars'), soon: false },
    { id: 'balance', title: t('home.modals.buySubscription.methods.balance'), soon: userData?.RSBalance < data.price_rub }
  ];
  const [methodActive, setMethodActive] = useState(methodsData[0].id);

  const handleMethodActive = (id: string) => {
    setMethodActive(id);
  };

  const addSubscription = async () => {
    const initDataRaw = TelegramModule.initDataRaw() as any;

    const init = await userApi.init(initDataRaw);
    if (!init) return;
    if (!init.subscription) return;

    setSubscriptionData({ ...init.subscription });
  }

  function subscribeActivation() {
    setBuyButtonLoading(false);
    onClose();
    addSubscription();
    setUserData({ ...userData, SubActivated: true });
  }

  async function createPayment() {
    setBuyButtonLoading(true);
    const res = await paymentApi.create(data.ID);
    if (!res.ok) {
      setBuyButtonLoading(false);
      return;
    };
    if (res.pay_url) {
      TelegramModule.useLink(res.pay_url);
      setTimeout(() => { setBuyButtonLoading(false); }, 5000);
      const sse = paymentApi.subscribeToPayment(res.payment_id, (data) => {
        if (data.status === "paid") {
          sse.close();
          subscribeActivation();
          return true;
        }
      });
    }
  }

  async function createPaymentStars() {
    setBuyButtonLoading(true);
    const res = await paymentApi.createStars(data.ID);
    if (!res.ok) {
      setBuyButtonLoading(false);
      return;
    };
    if (res.pay_url) {
      TelegramModule.useLink(res.pay_url);
      setBuyButtonLoading(false);
      const sse = paymentApi.subscribeToPayment(res.payment_id, (data) => {
        if (data.status === "paid") {
          sse.close();
          subscribeActivation();
          return true;
        }
      });
    }
  }

  async function createPaymentRSBalance() {
    setBuyButtonLoading(true);
    const res = await paymentApi.createRSBalance(data.ID);
    
    if (!res.ok) {
      setBuyButtonLoading(false);
      showErrorToast(
        <CloseIcon />,
        t('toasts.payment.error.title'),
        res.error
      );
      return;
    };
    if (res.ok) {
      subscribeActivation();
      return;
    }
  }

  async function createPaymentFreekassa() {
    setBuyButtonLoading(true);
    const res = await paymentApi.createFreekassa(data.ID);
    
    if (!res.ok) {
      setBuyButtonLoading(false);
      showErrorToast(
        <CloseIcon />,
        t('toasts.payment.error.title'),
        res.error
      );
      return;
    };
    if (res.ok) {
      TelegramModule.useTgLink(res.pay_url);
      const sse = paymentApi.subscribeToPayment(res.payment_id, (data) => {
        if (data.status === "paid") {
          sse.close();
          subscribeActivation();
          return true;
        }
      });
      return;
    }
  }

  function handleBuy() {
    if (methodActive === 'stars') createPaymentStars();
    if (methodActive === 'send') createPayment();
    if (methodActive === 'balance') createPaymentRSBalance();
    if (methodActive === 'sbp') createPaymentFreekassa();
  }

  return (
    <ModalShell onClose={onClose} closing={closing} onExited={onExited}>
      <div className={styles.inner}>
        <div className={styles.context}>
          <div className={styles.head}>
            <div className={styles.image}>
              <img src={data?.Type === 'custom' ? '/pages/sub-custom.svg' : data.Image} />
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
              className={`${styles.item} ${x.id === methodActive ? styles.active : ''} ${x.soon ? styles.soon : ''}`}
              onClick={() => handleMethodActive(x.id)}
            >
              <div className={styles.text}>
                <h4>{x.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buy}>
          {buyButtonLoading ? (
            <button className={styles.loading} disabled>
              <div className={styles.load}></div>
            </button>
          ) : (
            <button onClick={handleBuy}>
              <h4>
                {t('home.modals.buySubscription.buy', { price: data?.price_rub })}
              </h4>
            </button>
          )}
        </div>
      </div>
    </ModalShell>
  );
}