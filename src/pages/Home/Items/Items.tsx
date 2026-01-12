import styles from "./style.module.scss";

import { useEffect, useMemo, useState } from "react";
import { useModal } from "../../../components/modal/ModalProvider";
import { formatTimeLocalized } from "../../../utils/app";
import { useTranslation } from "react-i18next";
// import { useUserStore } from "../../../store/user.store";

export type SubItem = any;

type Props = {
  loading?: boolean;
  items?: SubItem[];
};

const fallbackData: SubItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  hours: "1",
  price_rub: "10.00",
  image: "..",
  saleAmount: 10,
}));

export const Items = ({
  loading = false,
  items = [],
}: Props) => {
  const { t } = useTranslation();
  const { open } = useModal();
  
  const [isSkeleton, setIsSkeleton] = useState(loading);
  const [loadedImages, setLoadedImages] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    setIsSkeleton(loading);
  }, [loading]);

  const list = useMemo(() => {
    if (isSkeleton) return fallbackData;
    if (!items?.length) return fallbackData;
    return items;
  }, [items, isSkeleton]);

  function onClick(item: SubItem) {
    open("buySubscription", { 
      data: item,
    });
  }

  function handleImageLoaded(id: string | number) {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  }

  return (
    <div className={styles.blocker}>
      <div className={styles.items}>
        {list.map((x, i) => {
          const key = x.id ?? i;
          const isLoaded = loadedImages[key];

          return (
            <div
              key={key}
              className={`${styles.item} ${isSkeleton ? styles.skeleton : ""}`}
              onClick={() => onClick(x)}
            >
              <div className={`skeleton-bg ${styles.skeletonBg}`} />

              {Boolean(x.Sale) && (
                <div className={styles.sale}>
                  <div className={styles.bg} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="55"
                    height="55"
                    viewBox="0 0 55 55"
                    fill="none"
                  >
                    <path
                      d="M51.4965 26.401L28.599 3.50354C26.3557 1.26026 23.3132 0 20.1408 0H1.99763C0.221489 0 -0.667999 2.14743 0.587919 3.40336L51.5967 54.4121C52.8526 55.668 55 54.7785 55 53.0024V34.8593C55 31.6868 53.7397 28.6443 51.4965 26.401Z"
                      fill="url(#paint0_linear_1_501)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_501"
                        x1="27.0891"
                        y1="0.996818"
                        x2="27.0891"
                        y2="54.825"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6CADF2" />
                        <stop offset="1" stopColor="#126099" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className={styles.text}>
                    <p>-{x.Sale}%</p>
                  </div>
                </div>
              )}

              <div className={styles.image}>
                {!isLoaded && (
                  <div className={styles.load}></div>
                )}
                <img
                  src={x.Image}
                  alt=""
                  loading="lazy"
                  onLoad={() => handleImageLoaded(key)}
                  className={`${styles.img} ${isLoaded ? styles.visible : ""}`}
                />
              </div>

              <div className={styles.title}>
                <h4>{formatTimeLocalized(x.hours, t)}</h4>
              </div>

              <div className={styles.button}>
                <div className={`skeleton-bg ${styles.skeletonBg}`} />
                <button disabled={isSkeleton}>
                  <h4>{x.price_rub}р</h4>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};