import React, { useEffect, useState } from "react";
import styles from './style.module.scss';
import ChevroneRightIcon from "../../../icons/ChevroneRight";

import DoneIcon from "../../../icons/Done";

import { formatTimeLocalized, getImageUrl, inviteFriend, inviteFriendsLocalized } from '../../../utils/app';
import { useUserStore } from '../../../store/user.store';
import { useTranslation } from "react-i18next";
import { showSuccessToast } from "../../../components/Toast/toastManager";
import { shootConfetti } from "../../../utils/confetti";

type TaskItem = {
  id: number;
  image: string;
  need: number;
  hours: number;
  type?: string;
  config: {
    TaskImage: string;
    TaskNeedFriends: number;
  };
  loading?: boolean;
};

type ItemsProps = {
  loading?: boolean;
  tasks?: TaskItem[];
  setTasks?: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  openSubscription?: (type: string, hours: number) => void;
};

export const Items: React.FC<ItemsProps> = ({ 
  loading = false, 
  tasks,
  setTasks,
  openSubscription,
}) => {
  const { t } = useTranslation();
  const userData = useUserStore((s) => s.userData);
  const userDataMeta = useUserStore((s) => s.userDataMeta);

  const refCount = userDataMeta?.ref_count || 0;

  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (tasks?.length) {
      tasks.forEach((t, i) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, t.id]);
        }, i * 150);
      });
    }
  }, [tasks]);

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  function onClick(x: TaskItem) {
    if (x.loading) return;
    setTasks?.(prev => prev.map(t => t.id === x.id ? { ...t, loading: true } : t));

    if (x.type && x.type === 'invite') {
      inviteFriend(userData?.Code);
      openSubscription?.('item', x.hours);
      showSuccessToast(
        <DoneIcon />,
        t('toasts.taskCompleted.title'),
        t('toasts.taskCompleted.description')
      );
      shootConfetti();
      setTasks?.(prev => prev.map(t => t.id === x.id ? { ...t, loading: false } : t));
    }
  }

  return (
    <div className={`${styles.blocker} ${loading ? styles.skeleton : ""}`}>
      <div className={styles.items}>
        {safeTasks.map((x, i) => {
          const isDone = refCount >= x?.config?.TaskNeedFriends;
          const isVisible = visibleItems.includes(x.id);

          return (
            <React.Fragment key={x.id}>
              <div className={`${styles.item} ${isVisible ? styles.visible : ''}`} 
                onClick={() => onClick(x)}>
                  
                <div className={styles.image}>
                  <img src={getImageUrl(x?.config?.TaskImage)} alt="" />
                </div>

                <div className={styles.text}>
                  <h4>{t('tasks.items.invite', { friends: inviteFriendsLocalized(x?.config?.TaskNeedFriends, t) })}</h4>
                  <div className={styles.descr}>
                    <p>{t('tasks.items.subscribeTo', { time: formatTimeLocalized(x?.hours, t) })}</p>
                  </div>
                </div>

                <div className={styles.info}>
                  {isDone ? (
                    <div className={styles.done}><p>{t('tasks.items.done')}</p></div>
                  ) : x.loading ? (
                    <div className={styles.process}>
                      <div className={styles.load}></div>
                    </div>
                  ) : (
                    <div className={styles.chevrone}><ChevroneRightIcon /></div>
                  )}
                </div>
              </div>
              {i !== safeTasks.length - 1 && <div className={styles.border}></div>}
            </React.Fragment>
          );
        })}
      </div>

      {refCount > 0 && (
        <div className={styles.footer}>
          <p>{t('tasks.footer.youInvited', { friends: inviteFriendsLocalized(refCount, t) })}</p>
        </div>
      )}
    </div>
  );
};