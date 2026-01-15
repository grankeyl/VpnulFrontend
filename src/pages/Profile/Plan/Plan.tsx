import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { formatDaysOrHoursLocalized, timeLeftMoscow } from '../../../utils/app';
import { useTranslation } from 'react-i18next';

import LockIcon from "../../../icons/Lock";
import AddIcon from "../../../icons/Add";
import LinkIcon from "../../../icons/Link";
import DeviceIcon from "../../../icons/Device";
import { useUserStore } from '../../../store/user.store';

export const Plan = ({ 
  connectLink,
  devices,
  limitDevices,
}: { 
  connectLink: string,
  devices: number,
  limitDevices: number,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const subscribeData = useUserStore((s) => s.subscriptionData);
  const hoursLeft = timeLeftMoscow(subscribeData?.expires);
  const subscribeHours = formatDaysOrHoursLocalized(hoursLeft, t);
  const [daysMatch, hoursMatch] = subscribeHours.match(/(\d+\s\S+)/g) || [];

  function redirectTo(path: string) {
    navigate(path);
  }

  return (
    <div className={styles.blocker}>
      <div className={styles.plan}>
        <div className={styles.context}>
          <div className={styles.icon}>
            <LockIcon />
          </div>
          <div className={styles.value}>
            <h4>{daysMatch ? daysMatch.split(' ')[0] : hoursMatch ? hoursMatch.split(' ')[0] : 0}</h4>
          </div>
          <div className={styles.text}>
            <p>{daysMatch ? daysMatch.split(' ')[1] : hoursMatch ? hoursMatch.split(' ')[1] : t('time.hours')}</p>
          </div>
          {hoursMatch && (
            <div className={styles.value}>
              <h4>{hoursMatch.split(' ')[0]}</h4>
            </div>
          )}
          {hoursMatch && (
            <div className={styles.text}>
              <p>{hoursMatch.split(' ')[1]}</p>
            </div>
          )}
        </div>

        <div className={styles.descr}>
          <p>{t('profile.plan.description')}</p>
        </div>

        <div className={styles.buttons}>
          <div className={styles.button}>
            <button onClick={() => redirectTo("/")}>
              <AddIcon />
              <h4>{t('profile.plan.buttons.add')}</h4>
            </button>
          </div>

          <div className={styles.button}>
            <a
              href={connectLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
            >
              <LinkIcon className={styles.link} />
              <h4>{t('profile.plan.buttons.connect')}</h4>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.devices}>
        <DeviceIcon />
        <p>{t('profile.plan.devices', { devices: devices, limit: limitDevices })}</p>
      </div>
    </div>
  );
};