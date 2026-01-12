import styles from './style.module.scss';
import ChevroneRightIcon from "../../../icons/ChevroneRight";

import { getImageUrl } from '../../../utils/app';
import { useTranslation } from 'react-i18next';

import TelegramModule from '../../../hooks/useTelegram';

type BlockProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  loading?: boolean;
  setTask?: React.Dispatch<React.SetStateAction<any[]>>;
  task?: any;
};

export const Block = ({
  image,
  title,
  description,
  loading = false,
  setTask,
  task
}: BlockProps) => {
  const { t } = useTranslation();
  const checkIsDone = () => {
    if (task?.type && task.type === 'subscribe') {
      // return true;
    }
    return false;
  };

  const isDone = checkIsDone();

  function onClick(id: number) {
    if (task?.loading) return;
    
    setTask?.(prev => prev.map(t => t.id === id ? { ...t, loading: true } : t));

    if (task?.type === 'subscribe') {
      TelegramModule.useLink(task?.config?.ChannelLink);
    }
  }

  return (
    <div
      className={`${styles.block} ${loading ? styles.skeleton : ""}`}
      onClick={() => onClick(task?.id)}
    >
      {loading && <div className={`skeleton-bg ${styles.skeletonBg}`} />}

      <div className={styles.image}>
        <img src={getImageUrl(image)} alt={title} />
      </div>

      <div className={styles.context}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className={styles.info}>
        {isDone ? (
          <div className={styles.done}><p>{t('tasks.block.done')}</p></div>
        ) : task?.loading ? (
          <div className={styles.process}>
            <div className={styles.load}></div>
          </div>
        ) : (
          <div className={styles.chevrone}><ChevroneRightIcon /></div>
        )}
      </div>
    </div>
  );
};