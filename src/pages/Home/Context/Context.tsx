import styles from "./style.module.scss";

// Components
import { useEffect, useState } from "react";

export const Context = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsSkeleton(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${styles.context} ${isSkeleton ? styles.skeleton : styles.reveal}`}>
      <div className={styles.head}>
        <div className={styles.skeletonBg} />
        <div className={styles.image}>
          <img src="/pages/home/logo.png" alt="logo" />
        </div>

        <div className={styles.stars}>
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className={styles.star} />
          ))}
        </div>
      </div>

      <div className={styles.title}>
        <div className={styles.skeletonBg} />
        <h4>{title}</h4>
      </div>

      <div className={styles.descr}>
        <div className={styles.skeletonBg} />
        <p>{description}</p>
      </div>
    </div>
  );
};