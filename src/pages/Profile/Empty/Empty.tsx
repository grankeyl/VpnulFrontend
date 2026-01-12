import styles from './style.module.scss';

import { Lottie } from '../../../components/Lottie/Lottie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DuckAnimation from '../../../assets/profile/duck.json';
import ChevroneRightIcon from "../../../icons/ChevroneRight";

export const Empty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  function choosePlan() {
    navigate("/");
  }

  return (
    <div className={styles.empty}>
      <div className={styles.lottie}>
        <Lottie
          className={styles.lottie}
          animationData={DuckAnimation}
        />
      </div>
      <div className={styles.descr}>
        <p>{t('profile.empty.description')}</p>
      </div>
      
      <div className={styles.button}>
        <button onClick={() => choosePlan()}>
          <h4>{t('profile.empty.choosePlan')}</h4>
          <ChevroneRightIcon />
        </button>
      </div>
    </div>
  );
};