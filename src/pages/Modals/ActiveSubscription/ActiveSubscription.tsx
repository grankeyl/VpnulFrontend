import styles from './style.module.scss';

import { ModalShell } from "../../../components/modal/ModalShell";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

export function ActiveSubscription({
  onClose,
  closing,
  onExited,
  data,
}: {
  onClose: () => void;
  closing?: boolean;
  onExited?: () => void;
  data?: any;
}) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  function goToInstruction() {
    onClose();
    navigate("/instruction");
  }
  
  return (
    <ModalShell onClose={onClose} closing={closing} onExited={onExited}>
      <div className={styles.inner}>
        <div className={styles.context}>
          <div className={styles.head}>
            <div className={styles.image}>
              {data?.type === 'x2' && <img src="/pages/sub-x2.svg" alt="sub-x2" />}
              {data?.type !== 'x2' && <img src="/pages/sub-active.svg" alt="sub-active" />}
            </div>
          </div>

          <div className={styles.title}>
            <h4>{data?.title}</h4>
          </div>

          <div className={styles.descr}>
            <p>{data?.description}</p>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.text}>
            <p>{t('home.modals.activeSubscription.footer.text')}</p>
          </div>
          <div className={styles.buy}>
            <button onClick={goToInstruction}>
              <h4>{t('home.modals.activeSubscription.footer.buy')}</h4>
              <ChevroneRightIcon />
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}