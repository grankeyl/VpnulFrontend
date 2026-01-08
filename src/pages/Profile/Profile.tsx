import styles from './style.module.scss';

import { useEffect } from 'react';
import { Context } from "./Context/Context";
import { Empty } from "./Empty/Empty";
// import { Plan } from "./Plan/Plan";
import { Block } from "./Block/Block";
import { Funcs } from "./Funcs/Funcs";

import TelegramModule from '../../hooks/useTelegram';

export function Profile() {
    useEffect(() => {
        TelegramModule.hideBackButton();
    }, []);
    
    return (
        <div className={`${styles.profile} page`}>
            <Context />

            <Empty />
            {/* <Plan /> */}

            <Block />
            <Funcs />
        </div>
    );
}