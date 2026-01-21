import styles from './style.module.scss';

import ChevroneRightIcon from "../../../icons/ChevroneRight";
import DoneIcon from "../../../icons/Done";

import * as userApi from "../../../api/user/user.api";
import * as taskApi from "../../../api/task/task.api";

import { getImageUrl } from '../../../utils/app';
import { useTranslation } from 'react-i18next';

import { useEffect, useRef } from 'react';
import { showSuccessToast } from '../../../components/Toast/toastManager';
import { shootConfetti } from '../../../utils/confetti';
import TelegramModule from '../../../hooks/useTelegram';
import { useUserStore } from '../../../store/user.store';

type BlockProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  hours?: number;
  loading?: boolean;
  setTask?: React.Dispatch<React.SetStateAction<any[]>>;
  task?: any;
  openSubscription?: (type: string, hours: any) => void;
};

const MAX_PENDING_TIME = 30_000;
const POLL_INTERVAL = 2000;

export const Block = ({
  image,
  title,
  description,
  hours,
  loading = false,
  setTask,
  task,
  openSubscription,
}: BlockProps) => {
  const { t } = useTranslation();
  const setSubscriptionData = useUserStore((s) => s.setSubscriptionData);

  const taskIntervalRef = useRef<any | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const waitingReturnRef = useRef(false);

  const isDone = task?.user_status === 'claimed';
  const isClaiming = task?.user_status === 'ready_to_claim';

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && waitingReturnRef.current && task?.id) {
        startTaskWatcher(task.id);
        waitingReturnRef.current = false;
      }
    };

    document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      stopWatcher();
    };
  }, [task?.id]);

  const stopWatcher = (id?: number, resetLoading = true) => {
    if (taskIntervalRef.current) {
      clearInterval(taskIntervalRef.current);
      taskIntervalRef.current = null;
    }

    startTimeRef.current = null;

    if (resetLoading && id) {
      setTask?.(prev =>
        prev.map(t =>
          t.id === id ? { ...t, loading: false } : t
        )
      );
    }
  };

  const addSubscription = async () => {
    const initDataRaw = TelegramModule.initDataRaw() as any;
    const init = await userApi.init(initDataRaw);
    if (init?.subscription) {
      setSubscriptionData({ ...init.subscription });
    }
  };

  const startSubscriptionFlow = async (id: any) => {
    if (taskIntervalRef.current) return;

    try {
      startTimeRef.current = Date.now();

      const res = await taskApi.start(id);
      if (!res?.ok) {
        stopWatcher(id);
        return;
      }

      startTaskWatcher(id);

      TelegramModule.useLink(task?.config?.ChannelLink);

    } catch (e) {
      console.error('start error:', e);
      stopWatcher(id);
    }
  };

  const startTaskWatcher = (id: number) => {
    if (taskIntervalRef.current) return;

    taskIntervalRef.current = setInterval(async () => {
      try {
        if (
          startTimeRef.current &&
          Date.now() - startTimeRef.current > MAX_PENDING_TIME
        ) {
          stopWatcher(id);
          return;
        }

        const res = await taskApi.task();
        if (!res?.ok || !Array.isArray(res.data)) return;

        const updatedTask = res.data.find((t: any) => t.id === id);
        if (!updatedTask) return;

        const isReady =
          updatedTask.user_status === 'ready_to_claim' ||
          updatedTask.user_status === 'claimed';

        setTask?.(prev =>
          prev.map(t =>
            t.id === id
              ? {
                  ...t,
                  user_status: updatedTask.user_status,
                  loading: !isReady
                }
              : t
          )
        );

        if (isReady) {
          stopWatcher();
        }

      } catch (e) {
        console.error('task watcher error:', e);
      }
    }, POLL_INTERVAL);
  };

  const onClick = async () => {
    if (!task || task.loading || isDone) return;

    setTask?.(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, loading: true } : t
      )
    );

    if (task.type === 'subscribe') {
      if (task.user_status === 'ready_to_claim') {
        claim(task.id);
      } else {
        await startSubscriptionFlow(task.id);
        // TelegramModule.useLink(task?.config?.ChannelLink);
      }
    }
  };

  async function claim(id: any) {
    try {
      const res = await taskApi.claim(id);
      if (!res?.ok) return;

      openSubscription?.('item', hours);

      showSuccessToast(
        <DoneIcon />,
        t('toasts.taskCompleted.title'),
        t('toasts.taskCompleted.description')
      );

      shootConfetti();
      stopWatcher();
      addSubscription();

      setTask?.(prev =>
        prev.map(t =>
          t.id === id
            ? { ...t, loading: false, status: 'done', user_status: 'claimed' }
            : t
        )
      );

    } catch (e) {
      console.error('claim error:', e);
      stopWatcher(id);
    }
  }

  return (
    <div
      className={`${styles.block} ${loading ? styles.skeleton : ""}`}
      onClick={onClick}
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
          <div className={styles.done}>
            <DoneIcon />
          </div>
        ) : isClaiming ? (
          <div className={styles.claiming}>
            <p>{t('tasks.block.claim')}</p>
          </div>
        ) : task?.loading ? (
          <div className={styles.process}>
            <div className={styles.load}></div>
          </div>
        ) : (
          <div className={styles.chevrone}>
            <ChevroneRightIcon />
          </div>
        )}
      </div>
    </div>
  );
};