import styles from './style.module.scss';

import { useEffect } from 'react';
import { Context } from "./Context/Context";
import { Empty } from "./Empty/Empty";
import { Plan } from "./Plan/Plan";
import { Block } from "./Block/Block";
import { Funcs } from "./Funcs/Funcs";
import { useUserStore } from '../../store/user.store';

import TelegramModule from '../../hooks/useTelegram';

export function Profile() {
    const subscriptionData = useUserStore((s) => s.subscriptionData);

    useEffect(() => {
        TelegramModule.hideBackButton();
    }, []);
    
    return (
        <div className={`${styles.profile} page`}>
            <Context 
                subscribed={subscriptionData?.id}
            />

            {!subscriptionData?.id && <Empty />}
            {subscriptionData?.id && (
                <Plan 
                    connectLink={subscriptionData?.connect_link}
                    devices={subscriptionData?.devices}
                    limitDevices={subscriptionData?.lim_devices}
                />
            )}

            <Block />
            <Funcs />
        </div>
    );
}