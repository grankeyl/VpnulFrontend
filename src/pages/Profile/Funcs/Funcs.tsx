import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

import { getImageUrl } from '../../../utils/app';

const funcsData = [
  {
    id: 1,
    image: getImageUrl('/bages/question.svg'),
    title: 'How to use',
  },
  {
    id: 2,
    image: getImageUrl('/bages/support.svg'),
    title: 'Support',
  },
];

export const Funcs = () => {
  return (
    <div className={styles.funcs}>
        {funcsData.map((x, i) => (
          <>
          <div className={styles.item} key={x.id}>
            <div className={styles.image}>
              <img src={x.image} alt="" />
            </div>
            <div className={styles.text}>
              <h4>{x.title}</h4>
            </div>
            <div className={styles.chevrone}>
              <ChevroneRightIcon />
            </div>
          </div>
          {i !== funcsData.length - 1 && <div className={styles.border}></div>}
          </>
        ))}
    </div>
  );
};