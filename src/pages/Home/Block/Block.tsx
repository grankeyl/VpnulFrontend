import styles from "./style.module.scss";

// Components
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const t = setTimeout(() => setIsSkeleton(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${styles.block} ${isSkeleton ? styles.skeleton : styles.reveal}`}>
      <div className={styles.image}>
        <img src={image} alt="" />
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