import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

import { getImageUrl } from '../../../utils/app';
import { useNavigate } from 'react-router-dom';

export const Block = () => {
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
            <h4>Referral program</h4>
            <p>Earn 30% from friends</p>
        </div>
        <div className={styles.chevrone}>
            <ChevroneRightIcon />
        </div>
    </div>
  );
};