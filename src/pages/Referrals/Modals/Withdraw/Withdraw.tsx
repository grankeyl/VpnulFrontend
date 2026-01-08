import styles from './style.module.scss';

import { ModalShell } from "../../../../components/modal/ModalShell";

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
  return (
    <ModalShell onClose={onClose} closing={closing} onExited={onExited}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.head}>
            <p>Enter amount to withdraw</p>
          </div>
          <div className={styles.input}>
            <div className={styles.icon}>
              <p>₽</p>
            </div>
            <input type="text" placeholder='Amount' />
          </div>
          <div className={styles.info}>
            <p>You will receive:</p>
            <p>≈20,12$</p>
          </div>
        </div>

        <div className={styles.context}>
          <div className={styles.item}>
            <h4>Withdrawals are processed via <span>@CryptoBot.</span></h4>
          </div>
          <div className={styles.item}>
            <h4>You will receive $USDT in your balance. Make sure you have opened the <span>@CryptoBot.</span></h4>
          </div>
        </div>

        <div className={styles.button}>
          <button>
            <h4>Withdraw 20,12$</h4>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}