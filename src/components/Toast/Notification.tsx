import React, { useEffect, useState } from 'react';
import styles from './Notification.module.scss';

interface NotificationProps {
  icon: any;
  title: string;
  description: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ 
  icon,
  title,
  description,
  type = 'success' 
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.notification} ${styles[type]} ${visible ? styles.show : styles.hide}`}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.text}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};