import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

import { getImageUrl } from '../../../utils/app';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TelegramModule from '../../../hooks/useTelegram';

export const Funcs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const funcsData = [
    {
      id: 1,
      image: getImageUrl('/bages/question.svg'),
      title: t('profile.funcs.howToUse'),
      redirect: '/instruction',
    },
    {
      id: 2,
      image: getImageUrl('/bages/support.svg'),
      title: t('profile.funcs.support'),
      link: import.meta.env.VITE_APP_SUPPORT_LINK,
    },
  ];

  function redirect(item: any) {
    if (item.link) {
      TelegramModule.useLink(item.link);
    } else {
      navigate(item.redirect);
    }
  }

  return (
    <div className={styles.funcs}>
        {funcsData.map((x, i) => (
          <>
          <div className={styles.item} key={x.id} onClick={() => redirect(x)}>
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