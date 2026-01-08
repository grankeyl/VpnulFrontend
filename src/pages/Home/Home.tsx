import styles from './style.module.scss';

import { useEffect, useState } from 'react';
import { Context } from "./Context/Context";
import { Block } from "./Block/Block";
import { Items } from "./Items/Items";

import { useSubsStore } from "../../store/subs.store";

import * as subsApi from "../../api/subs/subs.api";

export function Home() {
    const [items, setItems] = useState<any[]>([]);
    const [loadingItems, setLoadingItems] = useState(true);

    const subsData = useSubsStore((s) => s.subsData);
    const setSubsData = useSubsStore((s) => s.setSubsData);

    const getSubs = async () => {
        console.log("subsData", subsData);
        if (subsData) {
            setItems(subsData);
            setLoadingItems(false);
            return;
        };
        const res = await subsApi.subs();
        if (!res.ok) return;
        setItems(res.data);
        setSubsData(res.data);
        setLoadingItems(false);
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
                    loading={loadingItems}
                    items={items}
                />
            </div>
        </>
    );
}