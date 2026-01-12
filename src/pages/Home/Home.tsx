import styles from './style.module.scss';

import { useEffect, useState } from 'react';
import { Context } from "./Context/Context";
import { Block } from "./Block/Block";
import { Items } from "./Items/Items";
import { useTranslation } from 'react-i18next';

import { useSubsStore } from "../../store/subs.store";
import { useModal } from '../../components/modal/ModalProvider';
import { useUserStore } from '../../store/user.store';
import { shootConfetti } from '../../utils/confetti';

import * as subsApi from "../../api/subs/subs.api";
import TelegramModule from '../../hooks/useTelegram';

export function Home() {
    const { t } = useTranslation();
    const { open } = useModal();

    const [items, setItems] = useState<any[]>([]);
    const [loadingItems, setLoadingItems] = useState(true);

    const subsData = useSubsStore((s) => s.subsData);
    const setSubsData = useSubsStore((s) => s.setSubsData);

    const userData = useUserStore((s) => s.userData);
    const setUserData = useUserStore((s) => s.setUserData);

    const subActivated = useUserStore((s) => s.userData?.SubActivated);

    const getSubs = async () => {
        if (subsData) {
            setItems(subsData);
            setLoadingItems(false);
            return;
        }

        const res = await subsApi.subs();
        if (!res.ok) return;

        setItems(res.data);
        setSubsData(res.data);
        setLoadingItems(false);
    };

    function openSubscription() {
        open("activeSubscription", {
            data: {
                type: 'home',
                title: t('home.modals.activeSubscription.context.title'),
                description: t('home.modals.activeSubscription.context.description')
            }
        });
    }

    useEffect(() => {
        if (!subActivated) return;
        
        openSubscription();
        shootConfetti();
        setUserData({ ...userData, SubActivated: false });
    }, [subActivated, items]);

    useEffect(() => {
        TelegramModule.hideBackButton();
        getSubs();
    }, []);

    return (
        <div className={`${styles.home} page`}>
            <Context
                title={t('home.context.title')}
                description={t('home.context.description')}
            />
            <Block 
                title={t('home.block.title')}
                image="/pages/home/gift.png"
                description={t('home.block.description')}
                redirect="/tasks"
            />
            <Items 
                loading={loadingItems}
                items={items}
            />
        </div>
    );
}