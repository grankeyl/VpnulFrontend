import styles from "./style.module.scss";
import { useState } from "react";

// Icons
import ChevroneRightIcon from "../../../icons/ChevroneRight";

export const Block = ({
  title,
  image,
  description,
  redirect,
}: {
  title: string;
  image: string;
  description: string;
  redirect: string;
}) => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleImageLoaded() {
    setImageLoaded(true);
    setIsSkeleton(false);
  }

  return (
    <div
      className={`${styles.block} ${
        isSkeleton ? styles.skeleton : styles.reveal
      }`}
    >
      <div className={styles.image}>
        {!imageLoaded && <div className={styles.load} />}

        <img
          src={image}
          alt=""
          loading="lazy"
          onLoad={handleImageLoaded}
          className={`${styles.img} ${imageLoaded ? styles.visible : ""}`}
        />
      </div>

      <div className={styles.context}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className={styles.chevrone}>
        <ChevroneRightIcon />
      </div>
    </div>
  );
};