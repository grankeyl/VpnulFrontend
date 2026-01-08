import styles from './style.module.scss';

import MinusIcon from "../../../icons/Minus";

import { useModal } from '../../../components/modal/ModalProvider';

export const Balance = () => {
  const { open } = useModal();

  function onClick(item: any) {
    open("withdraw", { item });
  }

  return (
    <div className={styles.blocker}>
      <div className={styles.balance}>
        <div className={styles.context}>
          <div className={styles.value}>
            <h4>7 194р</h4>
          </div>
        </div>

        <div className={styles.descr}>
          <p>your balance</p>
        </div>

        <div className={styles.buttons}>
          <div className={styles.button}>
            <button onClick={() => onClick({ id: 1 })}>
              <MinusIcon />
              <h4>Withdraw</h4>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>Minimum amount to withdraw is 1000р</p>
      </div>
    </div>
  );
};