import styles from './style.module.scss';

import { useEffect, useRef, useState } from 'react';
import { Context } from "./Context/Context";
import { BlockInfo } from "./BlockInfo/BlockInfo";
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

    const loadedRef = useRef(false);

    const [items, setItems] = useState<any[]>([]);
    const [loadingItems, setLoadingItems] = useState(true);
    const [neverTookTheWheel, setNeverTookTheWheel] = useState(false);

    const subsData = useSubsStore((s) => s.subsData);
    const setSubsData = useSubsStore((s) => s.setSubsData);

    const userData = useUserStore((s) => s.userData);
    const setUserData = useUserStore((s) => s.setUserData);

    const subActivated = useUserStore((s) => s.userData?.SubActivated);

    const getSubs = async () => {
        try {
            if (subsData) {
                console.log("subsData", subsData);
                setItems(subsData);
                return;
            }

            const res = await subsApi.subs();
            if (!res.ok) return;

            setItems(res.data);
            setSubsData(res.data);
            setNeverTookTheWheel(res.never_took_trial);
        } catch (e) {
            console.error("getSubs error", e);
        } finally {
            setLoadingItems(false);
        }
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
    }, [subActivated]);

    useEffect(() => {
        if (loadedRef.current) return;
        loadedRef.current = true;

        TelegramModule.hideBackButton();
        getSubs();
    }, []);

    return (
        <div className={`${styles.home} page`}>
            <Context
                title={t('home.context.title')}
                description={t('home.context.description')}
            />
            <BlockInfo 
                id={0}
                key={0}
                image={'/bages/double.svg'}
                title={t('tasks.blockInfo.title')}
                description={t('tasks.blockInfo.description')}
                loading={false}
            
                openSubscription={openSubscription}
            />
            <Items 
                loading={loadingItems}
                neverTookTheWheel={neverTookTheWheel}
                items={items}

                setNeverTookTheWheel={setNeverTookTheWheel}
            />
        </div>
    );
}