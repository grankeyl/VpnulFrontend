import { useEffect, useState } from "react";
import styles from './style.module.scss';

import { Context } from "./Context/Context";
import { useTranslation } from "react-i18next";

export function Redirect() {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(5);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // 1️⃣ Забираем redirect_to
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect_to");

    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, []);

  // 2️⃣ Таймер
  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // 3️⃣ Редирект
  useEffect(() => {
    if (seconds === 0 && redirectUrl) {
      // кастомные схемы открываются через window.location
      window.location.href = redirectUrl;
    }
  }, [seconds, redirectUrl]);

  return (
    <div className={`${styles.redirect} page`}>
      <div className={styles.inner}>
        <Context />

        <div className={styles.timer}>
          <h4 className={styles.timerNumber}>{seconds}</h4>
        </div>

        <div className={styles.or}>
          <div className={styles.descr}>
            <p>{t('redirect.or.description')}</p>
          </div>

          <div className={styles.button}>
            <button
              disabled={!redirectUrl}
              onClick={() => redirectUrl && (window.location.href = redirectUrl)}
            >
              <h4>{t('redirect.or.button')}</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}