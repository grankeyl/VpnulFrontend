import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

import { getImageUrl } from '../../../utils/app';

export const Block = () => {
  return (
    <div className={styles.block}>
        <div className={styles.image}>
            <img src={getImageUrl('/bages/users.svg')} alt="" />
        </div>
        <div className={styles.context}>
            <h4>Free subscription</h4>
            <p>For inviting a friend</p>
        </div>
        <div className={styles.chevrone}>
            <ChevroneRightIcon />
        </div>
    </div>
  );
};