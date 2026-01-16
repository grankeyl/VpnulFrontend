import styles from './style.module.scss';

import * as referralsApi from "../../api/referrals/referrals.api";

import { Context } from "./Context/Context";
import { Link } from "./Link/Link";
import { Balance } from "./Balance/Balance";
import { Items } from "./Items/Items";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TelegramModule from '../../hooks/useTelegram';

export function Referrals() {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);

    async function getItems() {
        const res = await referralsApi.history();
        setItems(res.items);
    }

    useEffect(() => {
        getItems();
    }, []);

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
                <Balance 
                    itemsCount={items.length}
                />
                <Items
                    items={items}
                />
            </div>
        </>
    );
}