import styles from './style.module.scss';

import { Context } from "./Context/Context";
import { Link } from "./Link/Link";
import { Balance } from "./Balance/Balance";
import { Items } from "./Items/Items";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TelegramModule from '../../hooks/useTelegram';

export function Referrals() {
    const navigate = useNavigate();

    useEffect(() => {
        TelegramModule.useBackButton(() => {
            navigate(-1);
        });
    }, []);

    return (
        <>
            <div className={`${styles.tasks} page`}>
                <Context />
                <Link />
                <Balance />
                <Items />
            </div>
        </>
    );
}