import styles from './style.module.scss';

import { useEffect, useState } from 'react';
import { Context } from "./Context/Context";
import { Block } from "./Block/Block";
import { Items } from "./Items/Items";
import { useTranslation } from 'react-i18next';
import { formatTimeLocalized } from '../../utils/app';
import { useModal } from '../../components/modal/ModalProvider';

import * as taskApi from "../../api/task/task.api";

import TelegramModule from '../../hooks/useTelegram';

export function Tasks() {
    const { t } = useTranslation();
    const { open } = useModal();
    const [loadTasks, setLoadTasks] = useState(true);
    const [tasks, setTasks] = useState<any[]>([
        { id: 1, category: 'first', config: { TaskImage: '' }, loading: false },
        { id: 2, category: 'main', config: { TaskImage: '' }, loading: false },
        { id: 3, category: 'other', config: { TaskImage: '' }, loading: false },
        { id: 4, category: 'other', config: { TaskImage: '' }, loading: false },
        { id: 5, category: 'other', config: { TaskImage: '' }, loading: false },
    ]);

    const mainTasks = tasks.filter((x) => x.category === 'main');
    const otherTasks = tasks.filter((x) => x.category === 'other');

    const getTasks = async () => {
        const res = await taskApi.task();
        if (!res.ok) return;

        const tasksWithLoading = res.data.map((task: any) => ({
            ...task,
            loading: false
        }));
        setTasks(tasksWithLoading);
        setLoadTasks(false);
    };

    function openSubscription(type: string, hours: number) {
        open("activeSubscription", {
            data: {
                type: type,
                title:  t('tasks.modals.activeSubscription.context.title'),
                description: t('tasks.modals.activeSubscription.context.description', { time: formatTimeLocalized(hours, t) })
            }
        });
    }

    useEffect(() => {
        TelegramModule.hideBackButton();
        getTasks();
    }, []);

    return (
        <>
            <div className={`${styles.tasks} page`}>
                <Context />

                {mainTasks.map((x) => (
                    <Block 
                        id={x.id}
                        key={x.id}
                        image={x.config.TaskImage}
                        title={t('tasks.block.subscribe', { name: x?.config?.ChannelName })}
                        description={t('tasks.block.subscribeTo', { time: formatTimeLocalized(x?.hours, t) })}
                        hours={x?.hours}
                        loading={loadTasks}

                        setTask={setTasks}
                        task={x}
                        
                        openSubscription={openSubscription}
                    />
                ))}

                <Items 
                    tasks={otherTasks}
                    loading={loadTasks}
                    setTasks={setTasks}

                    openSubscription={openSubscription}
                />
            </div>
        </>
    );
}