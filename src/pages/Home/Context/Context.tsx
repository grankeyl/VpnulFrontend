import styles from "./style.module.scss";
import { useState } from "react";

export const Context = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleImageLoaded() {
    setImageLoaded(true);
    setIsSkeleton(false);
  }

  return (
    <div
      className={`${styles.context} ${
        isSkeleton ? styles.skeleton : styles.reveal
      }`}
    >
      <div className={styles.head}>
        <div className={styles.skeletonBg} />

        <div className={styles.image}>
          {!imageLoaded && <div className={styles.load} />}

          <img
            src="/pages/home/logo.png"
            alt="logo"
            loading="eager"
            onLoad={handleImageLoaded}
            className={`${styles.img} ${
              imageLoaded ? styles.visible : ""
            }`}
          />
        </div>

        <div className={styles.stars}>
          {Array.from({ length: 70 }).map((_, i) => (
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