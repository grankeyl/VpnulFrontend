import styles from './style.module.scss';

import MinusIcon from "../../../icons/Minus";

import { useModal } from '../../../components/modal/ModalProvider';
import { useTranslation } from 'react-i18next';

export const Balance = () => {
  const { t } = useTranslation();
  const { open } = useModal();

  function onClick(item: any) {
    open("withdraw", { item });
  }

  return (
    <div className={styles.blocker}>
      <div className={styles.balance}>
        <div className={styles.context}>
          <div className={styles.value}>
            <h4>324р</h4>
          </div>
        </div>

        <div className={styles.descr}>
          <p>{t('referrals.balance.description')}</p>
        </div>

        <div className={styles.buttons}>
          <div className={styles.button}>
            <button onClick={() => onClick({ id: 1 })}>
              <MinusIcon />
              <h4>{t('referrals.balance.withdraw')}</h4>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>{t('referrals.balance.minWithdraw')}</p>
      </div>
    </div>
  );
};