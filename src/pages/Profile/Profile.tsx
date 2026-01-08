import styles from './style.module.scss';

import { Context } from "./Context/Context";

import { Empty } from "./Empty/Empty";
// import { Plan } from "./Plan/Plan";

import { Block } from "./Block/Block";
import { Funcs } from "./Funcs/Funcs";

export function Profile() {
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