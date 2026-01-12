import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";
import DoneIcon from "../../../icons/Done";

import { getImageUrl } from '../../../utils/app';
import { useTranslation } from 'react-i18next';
import { showSuccessToast } from '../../../components/Toast/toastManager';
import { shootConfetti } from '../../../utils/confetti';

import TelegramModule from '../../../hooks/useTelegram';

type BlockInfoProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  loading?: boolean;
  setTask?: React.Dispatch<React.SetStateAction<any[]>>;
  task?: any;
  openSubscription?: (type: string, hours: number) => void;
};

export const BlockInfo = ({
  image,
  title,
  description,
  loading = false,
  setTask,
  task,
  openSubscription,
}: BlockInfoProps) => {
  const { t } = useTranslation();
  const checkIsDone = () => {
    if (task?.type && task.type === 'bying') {
      // return true;
    }
    return false;
  };

  const isDone = checkIsDone();

  console.log('openSubscription', openSubscription);

  function onClick(id: number) {
    if (task?.loading) return;
    
    setTask?.(prev => prev.map(t => t.id === id ? { ...t, loading: true } : t));

    if (task?.type === 'bying') {
      openSubscription?.('x2', 2);
      showSuccessToast(
        <DoneIcon />,
        t('toasts.taskCompleted.title'),
        t('toasts.taskCompleted.description')
      );
      shootConfetti();
      TelegramModule.useLink(task?.config?.ChannelLink);
    }
  }

  return (
    <div
      className={`${styles.blockInfo} ${loading ? styles.skeleton : ""}`}
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
          <div className={styles.done}><p>{t('tasks.blockInfo.done')}</p></div>
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