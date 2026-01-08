import styles from './style.module.scss';

import { useEffect, useState } from 'react';
import { Context } from "./Context/Context";
import { Block } from "./Block/Block";
import { Items } from "./Items/Items";

import * as subsApi from "../../api/subs/subs.api";

export function Home() {
    const [items, setItems] = useState<any[]>([]);

    const getSubs = async () => {
        const res = await subsApi.subs();
        if (!res.ok) return;
        setItems(res.data);
    };

    useEffect(() => {
        getSubs();
    }, []);

    return (
        <>
            <div className={`${styles.home} page`}>
                <Context
                    title="VPN"
                    description="Unlock your digital freedom here"
                />
                <Block 
                    title="Free subscription"
                    image="/pages/home/gift.png"
                    description="For inviting a friend"
                    redirect="/"
                />
                <Items 
                    items={items}
                />
            </div>
        </>
    );
}