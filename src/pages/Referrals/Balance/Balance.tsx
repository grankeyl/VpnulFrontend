import styles from './style.module.scss';

import MinusIcon from "../../../icons/Minus";

import { useModal } from '../../../components/modal/ModalProvider';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../../store/user.store';

export const Balance = ({ itemsCount }: { itemsCount: number }) => {
  const { t } = useTranslation();
  const { open } = useModal();

  const MIN_WITHDRAW = 1500;

  const userData = useUserStore((s) => s.userData);

  function onClick(item: any) {
    open("withdraw", { item });
  }

  return (
    <div className={styles.blocker}>
      <div className={styles.balance}>
        <div className={styles.context}>
          <div className={styles.value}>
            <h4>{userData?.RSBalance || 0}р</h4>
          </div>
        </div>

        <div className={styles.descr}>
          <p>{t('referrals.balance.description')}</p>
        </div>

        <div className={styles.buttons}>
          <div className={styles.button}>
            <button onClick={() => onClick({ id: 1 })} disabled={userData?.RSBalance < MIN_WITHDRAW}>
              <MinusIcon />
              <h4>{t('referrals.balance.withdraw')}</h4>
            </button>
          </div>
        </div>
      </div>
      {itemsCount > 0 && (
        <div className={styles.footer}>
          <p>{t('referrals.balance.minWithdraw', { amount: MIN_WITHDRAW })}</p>
        </div>
      )}
    </div>
  );
};