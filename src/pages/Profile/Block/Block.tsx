import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

import { getImageUrl } from '../../../utils/app';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Block = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function onClick() {
    navigate('/profile/referrals');
  }

  return (
    <div className={styles.block} onClick={onClick}>
        <div className={styles.image}>
            <img src={getImageUrl('/bages/users.svg')} alt="" />
        </div>
        <div className={styles.context}>
            <h4>{t('profile.block.title')}</h4>
            <p>{t('profile.block.description')}</p>
        </div>
        <div className={styles.chevrone}>
            <ChevroneRightIcon />
        </div>
    </div>
  );
};