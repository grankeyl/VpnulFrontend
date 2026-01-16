import styles from './style.module.scss';

import CloseIcon from "../../../../icons/Close";
import DoneIcon from "../../../../icons/Done";

import * as paymentApi from "../../../../api/payment/payment.api";

import { ModalShell } from "../../../../components/modal/ModalShell";
import { useTranslation } from 'react-i18next';
import { showErrorToast, showSuccessToast } from '../../../../components/Toast/toastManager';
import { useUserStore } from '../../../../store/user.store';

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
  
  const MIN_WITHDRAW = 1500;
  
  const userData = useUserStore((s) => s.userData);
  const setUserData = useUserStore((s) => s.setUserData);

  async function handleWithdraw() {
    if (!userData?.RSBalance || userData?.RSBalance < MIN_WITHDRAW) {
      showErrorToast(
        <CloseIcon />,
        'Error',
        'Not enough balance'
      );
      return;
    };

    const res = await paymentApi.rsBalanceWithdraw();
    if (!res.ok) {
      showErrorToast(
        <CloseIcon />,
        'Error',
        res.error
      );
      return;
    };
    if (res.ok) {
      showSuccessToast(
        <DoneIcon />,
        'Success',
        'Withdraw success'
      ),
      setUserData({ ...userData, RSBalance: 0 });
      onClose();
    }
  }

  return (
    <ModalShell onClose={onClose} closing={closing} onExited={onExited}>
      <div className={styles.inner}>
        {/* <div className={styles.main}>
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
        </div> */}

        <div className={styles.context}>
          <div className={styles.item}>
            <h4>{t('referrals.modals.withdraw.context.processed')} <span>@CryptoBot.</span></h4>
          </div>
          <div className={styles.item}>
            <h4>{t('referrals.modals.withdraw.context.willReceive')} <span>@CryptoBot.</span></h4>
          </div>
        </div>

        <div className={styles.button}>
          <button onClick={handleWithdraw}>
            <h4>{t('referrals.modals.withdraw.button', { amount: userData?.RSBalance || 0 })}</h4>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}