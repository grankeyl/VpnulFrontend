import styles from './style.module.scss';

import CopyIcon from "../../../icons/Copy";

import { useTranslation } from 'react-i18next';
import { showSuccessToast } from '../../../components/Toast/toastManager';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import { useUserStore } from '../../../store/user.store';
import { inviteFriend } from '../../../utils/app';

export const Link = () => {
  const { t } = useTranslation();
  const userData = useUserStore((s) => s.userData);

  const link = `${import.meta.env.VITE_APP_MINI_APP_LINK}=${userData?.Code}`;

  function copyLink() {
    copyToClipboard(link);
    showSuccessToast(
      <CopyIcon />,
      t('toasts.copyLink.title'),
      t('toasts.copyLink.description')
    );
  }

  function shareLink() {
    inviteFriend(userData?.Code);
  }

  return (
    <div className={styles.link}>
      <div className={styles.head}>
        <p>{t('referrals.link.title')}</p>
      </div>
      <div className={styles.block}>
        <div className={styles.left} onClick={copyLink}>
          <h4>{link}</h4>
          <CopyIcon />
        </div>
        <div className={styles.right}>
          <div className={styles.button}>
            <button onClick={shareLink}>
              <h4>{t('referrals.link.share')}</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};