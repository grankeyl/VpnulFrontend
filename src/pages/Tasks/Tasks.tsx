import styles from './style.module.scss';

import { useEffect } from 'react';
import { Context } from "./Context/Context";
import { Block } from "./Block/Block";
import { Items } from "./Items/Items";

import TelegramModule from '../../hooks/useTelegram';

export function Tasks() {
    useEffect(() => {
        TelegramModule.hideBackButton();
    }, []);

    return (
        <>
            <div className={`${styles.tasks} page`}>
                <Context />
                <Block />
                <Block />
                <Items />
            </div>
        </>
    );
}