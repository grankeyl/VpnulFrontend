import styles from './style.module.scss';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ChevroneRightIcon from "../../../icons/ChevroneRight";

// Images
import Block2Image from '../../../assets/instruction/block2.png';

import TelegramModule from '../../../hooks/useTelegram';

export const Info = ({
  section,
}: {
  section?: any;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function openLink(link: string) {
    TelegramModule.useTgLink(link);
  }

  function openProfile() {
    navigate('/profile');
  }

  return (
    <div className={styles.blocks}>
      <div className={styles.block}>
        <div className={styles.context}>
          <div className={styles.title}>
            <h4>1</h4>
            <p>{t('instruction.info.first.title')}</p>
          </div>
          {section.type === 'ios' && (
            <div className={styles.descr}>
              <p>{t('instruction.info.first.description')}</p>
            </div>
          )}
          {section.type === 'android' && (
            <div className={styles.descr}>
              <p>{t('instruction.info.first.description1')}</p>
            </div>
          )}
          {section.type === 'windows' && (
            <div className={styles.descr}>
              <p>{t('instruction.info.first.description1')}</p>
            </div>
          )}
          {section.type === 'tv' && (
            <div className={styles.descr}>
              <p>{t('instruction.info.first.description1')}</p>
            </div>
          )}
        </div>
        {section.type === 'ios' && (
          <div className={styles.buttons}>
            <button onClick={() => openLink(section.link)}>
              <h4>iOS Russia</h4>
              <ChevroneRightIcon />
            </button>
            <button onClick={() => openLink(section.link2)}>
              <h4>iOS Global</h4>
              <ChevroneRightIcon />
            </button>
          </div>
        )}
        {section.type === 'android' && (
          <div className={styles.buttons}>
            <button onClick={() => openLink(section.link)}>
              <h4>{t('instruction.info.first.download')}</h4>
              <ChevroneRightIcon />
            </button>
          </div>
        )}
        {section.type === 'windows' && (
          <div className={styles.buttons}>
            <button onClick={() => openLink(section.link)}>
              <h4>{t('instruction.info.first.download')}</h4>
              <ChevroneRightIcon />
            </button>
          </div>
        )}
        {section.type === 'tv' && (
          <div className={styles.buttons}>
            <button>
              <h4>Android TV</h4>
              <ChevroneRightIcon />
            </button>
            <button>
              <h4>Apple TV</h4>
              <ChevroneRightIcon />
            </button>
          </div>
        )}
      </div>

      <div className={styles.block2}>
        <div className={styles.context}>
          <div className={styles.title}>
            <h4>2</h4>
            <p>{t('instruction.info.second.title')}</p>
          </div>
          <div className={styles.descr}>
            <p>{t('instruction.info.second.description')}</p>
          </div>
          <div className={styles.button}>
            <button onClick={openProfile}>
              <h4>{t('instruction.info.second.profile')}</h4>
              <ChevroneRightIcon />
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <img src={Block2Image} alt="block2" />
        </div>
      </div>
    </div>
  );
};