import React, { useEffect, useState } from "react";
import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";
import TelegramModule from "../../../hooks/useTelegram";

import DoneIcon from "../../../icons/Done";

import * as userApi from "../../../api/user/user.api";
import * as taskApi from "../../../api/task/task.api";

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
  user_status?: string;
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

  const userDataMeta = useUserStore((s) => s.userDataMeta);
  const setSubscriptionData = useUserStore((s) => s.setSubscriptionData);

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

  const addSubscription = async () => {
    const initDataRaw = TelegramModule.initDataRaw() as any;

    const init = await userApi.init(initDataRaw);
    if (!init) return;
    if (!init.subscription) return;

    setSubscriptionData({ ...init.subscription });
  }

  function onClick(x: TaskItem) {
    if (!x || x.loading || x.user_status === 'claimed') return;
    setTasks?.(prev => prev.map(t => t.id === x.id ? { ...t, loading: true } : t));

    if (x.type && x.type === 'invite') {
      if (x.user_status === 'claimed') { return; }
      if (x.user_status === 'ready_to_claim') {
        claim(x.id);
      } else {
        inviteFriend('123');
        setTasks?.(prev => prev.map(t => t.id === x.id ? { ...t, loading: false } : t));
      }
    }
  }

  async function claim(id: any) {
    if (id) {
      const res = await taskApi.claim(id);
      if (!res.ok) return;

      openSubscription?.('item', res.data.amount);
      showSuccessToast(
        <DoneIcon />,
        t('toasts.taskCompleted.title'),
        t('toasts.taskCompleted.description')
      );
      shootConfetti();
      addSubscription();
      setTasks?.(prev => prev.map(t => t.id === res.data.task_id ? { ...t, loading: false, user_status: 'claimed' } : t));
    }
  }

  return (
    <div className={`${styles.blocker} ${loading ? styles.skeleton : ""}`}>
      <div className={styles.items}>
        {safeTasks.map((x, i) => {
          const isDone = x?.user_status === 'claimed';
          const isClaiming = x?.user_status === 'ready_to_claim';
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
                    <div className={styles.done}>
                      <DoneIcon />
                    </div>
                  ) : isClaiming ? (
                    <div className={styles.claiming}><p>{t('tasks.items.claim')}</p></div>
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