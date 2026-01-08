import styles from './style.module.scss';

import { Context } from "./Context/Context";
import { Block } from "./Block/Block";
import { Items } from "./Items/Items";

export function Tasks() {
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