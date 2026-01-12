import styles from './style.module.scss';

import { ModalShell } from "../../../../components/modal/ModalShell";
import { useTranslation } from 'react-i18next';

export function WithdrawModal({
  onClose,
  closing,
  onExited,
}: {
  planId: string;
  onClose: () => void;
  closing?: boolean;
  onExited?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <ModalShell onClose={onClose} closing={closing} onExited={onExited}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.head}>
            <p>{t('referrals.modals.withdraw.main.enterAmount')}</p>
          </div>
          <div className={styles.input}>
            <div className={styles.icon}>
              <p>₽</p>
            </div>
            <input type="text" placeholder={t('referrals.modals.withdraw.main.amount')} />
          </div>
          <div className={styles.info}>
            <p>{t('referrals.modals.withdraw.main.info')}</p>
            <p>≈20,12$</p>
          </div>
        </div>

        <div className={styles.context}>
          <div className={styles.item}>
            <h4>{t('referrals.modals.withdraw.context.processed')} <span>@CryptoBot.</span></h4>
          </div>
          <div className={styles.item}>
            <h4>{t('referrals.modals.withdraw.context.willReceive')} <span>@CryptoBot.</span></h4>
          </div>
        </div>

        <div className={styles.button}>
          <button>
            <h4>{t('referrals.modals.withdraw.button', { amount: 23.5 })}</h4>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}