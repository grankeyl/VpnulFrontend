import styles from './style.module.scss';

import { Context } from "./Context/Context";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sections } from './Sections/Sections';
import { Info } from './Info/Info';

import TelegramModule from '../../hooks/useTelegram';

const sectionsData = [
    { 
        id: 1, 
        title: 'iOS', 
        type: 'ios',
        link: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
        link2: 'https://apps.apple.com/us/app/happ-proxy-utility/id6504287215',
    },
    { 
        id: 2, 
        title: 'Android', 
        type: 'android',
        link: 'https://play.google.com/store/apps/details?id=com.happproxy',
    },
    { 
        id: 3, 
        title: 'Windows', 
        type: 'windows',
        link: 'https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe',
    },
    { 
        id: 4, 
        title: 'TV',
        type: 'tv', 
        soon: true
    }
];

export function Instruction() {
    const navigate = useNavigate();

    const [sectionActive, setSectionActive] = useState(1);

    useEffect(() => {
        TelegramModule.useBackButton(() => {
            navigate(-1);
        });
    }, []);

    return (
        <>
            <div className={`${styles.instruction} page`}>
                <Context />
                <Sections 
                    active={sectionActive}
                    sections={sectionsData}
                    setSection={setSectionActive}
                />
                <Info
                    section={sectionsData.find((x) => x.id === sectionActive)}
                />
            </div>
        </>
    );
}