import styles from "./style.module.scss";

import { useEffect, useMemo, useState } from "react";
import { useModal } from "../../../components/modal/ModalProvider";
import { formatDaysOrHoursLocalized, formatTimeLocalized } from "../../../utils/app";
import { useTranslation } from "react-i18next";
import { DaysSlider } from "./DaysSlider";
import { showErrorToast } from "../../../components/Toast/toastManager";

import * as subsApi from "../../../api/subs/subs.api";

// Icons
import Close from "../../../icons/Close";

export type SubItem = any;

type Props = {
  loading?: boolean;
  neverTookTheWheel?: boolean;
  items?: SubItem[];
  setNeverTookTheWheel?: React.Dispatch<React.SetStateAction<boolean>>;
};

const fallbackData: SubItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  hours: "1",
  price_rub: "10.00",
  Image: "..",
  Sale: 10,
}));

type ItemView = {
  // классы
  rootClass: string;
  // текст/значения
  priceText: string;
  titleText: string;
  image: string;
  // поведение
  disableClick: boolean;
};

export const Items = ({ 
  loading = false, 
  neverTookTheWheel = false, 
  items = [],
  setNeverTookTheWheel = () => {},
}: Props) => {
  const { t } = useTranslation();
  const { open } = useModal();

  const [isSkeleton, setIsSkeleton] = useState(loading);
  const [loadedImages, setLoadedImages] = useState<Record<string | number, boolean>>({});

  const [customDays, setCustomDays] = useState<number>(7);

  const customHours = useMemo(() => {
    const totalHours = customDays * 24;
    return formatDaysOrHoursLocalized(totalHours, t);
  }, [customDays, t]);

  const [customDaysMatch, customHoursMatch] = customHours.match(/(\d+\s\S+)/g) || [];

  useEffect(() => {
    setIsSkeleton(loading);
  }, [loading]);

  const list = useMemo(() => {
    if (isSkeleton) return fallbackData;
    if (!items?.length) return fallbackData;
    return items;
  }, [items, isSkeleton]);

  const getImage = (x: SubItem) => x?.Image ?? x?.image ?? "/pages/sub-custom.svg";
  const getSale = (x: SubItem) => x?.Sale ?? x?.sale ?? x?.saleAmount ?? 0;
  const getHours = (x: SubItem) => x?.hours ?? x?.Hours ?? "0";
  const getPriceRub = (x: SubItem) => x?.price_rub ?? x?.priceRub ?? x?.price ?? "0";

  function onClick(item: SubItem) {
    open("buySubscription", {
      data: item,
      customDays,
    });
  }

  function onClickCustom(days: number, price: number) {
    const hours = days * 24;

    open("buySubscription", {
      data: {
        Status: "active",
        Image: "/pages/sub-custom.svg",
        hours,
        price_rub: price,
        Index: 4,
        Type: "custom",
      },
      customDays,
    });
  }

  function handleImageLoaded(id: string | number) {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  }

  function buildItemView(x: SubItem, i: number, isSkeletonNow: boolean): ItemView {
    const hours = getHours(x);
    const priceRub = getPriceRub(x);

    const isFirst = i === 0;
    const firstFree = neverTookTheWheel && isFirst;

    // тут вся логика отдельным объектом как ты просил:
    const rootClass = [
      styles.item,
      isSkeletonNow ? styles.skeleton : "",
      firstFree ? styles.firstNever : "", // <- стиль только для 1-го если neverTookTheWheel
    ]
      .filter(Boolean)
      .join(" ");

    return {
      rootClass,
      priceText: firstFree ? "0р" : `${priceRub}р`,
      titleText: firstFree ? formatTimeLocalized(72, t) : formatTimeLocalized(hours, t),
      image: firstFree ? "/pages/sub-3.svg" : getImage(x),
      disableClick: isSkeletonNow,
    };
  }

  async function getTrial(x: SubItem) {
    const res = await subsApi.trial();
    if (!res.ok) {
      showErrorToast(Close, t('toasts.payment.error.title'), res.error);
      return;
    };

    setNeverTookTheWheel(false);

    open("activeSubscription", {
      data: {
        type: 'home',
        title: t('home.modals.activeSubscription.context.title'),
        description: t('home.modals.activeSubscription.context.description')
      }
    });
  } 

  return (
    <div className={styles.blocker}>
      <div className={styles.items}>
        {list.map((x, i) => {
          const key = x?.id ?? i;
          const isLoaded = Boolean(loadedImages[key]);
          const Sale = getSale(x);
          const view = buildItemView(x, i, isSkeleton);

          return (
            <div
              key={key}
              className={`${view.rootClass} ${neverTookTheWheel && i === 0 ? styles.firstNever : ""}`}
              onClick={() => {
                if (view.disableClick) return;
                if (neverTookTheWheel && i === 0) {
                  getTrial(x);
                  return;
                };
                onClick(x);
              }}
            >
              <div className={`skeleton-bg ${styles.skeletonBg}`} />

              {(Boolean(Sale) || i === 2) && (
                <div className={styles.sale}>
                  <div className={styles.bg} />
                  <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
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
                    {Sale ? <p>-{Sale}%</p> : i === 2 ? <p>{t("home.items.popular")}</p> : null}
                  </div>
                </div>
              )}

              <div className={styles.image}>
                {!isLoaded && <div className={styles.load} />}
                <img
                  src={view.image}
                  alt=""
                  loading="lazy"
                  onLoad={() => handleImageLoaded(key)}
                  className={`${styles.img} ${isLoaded ? styles.visible : ""}`}
                />
              </div>

              <div className={styles.title}>
                <h4>{view.titleText}</h4>
              </div>

              <div className={styles.button}>
                <div className={`skeleton-bg ${styles.skeletonBg}`} />
                <button disabled={isSkeleton}>
                  <h4>{view.priceText}</h4>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className={`${styles.custom} ${isSkeleton ? styles.skeleton : ""}`}>
        <div className={styles.title}>
          <div className={`skeleton-bg ${isSkeleton ? styles.skeletonBg : styles.skeletonDont}`} />
          <h4>Custom term</h4>
        </div>

        <div className={styles.eco}>
          <div className={`skeleton-bg ${isSkeleton ? styles.skeletonBg : styles.skeletonDont}`} />
          <p>Эконимия: 1000p</p>
        </div>

        <div className={styles.time}>
          <div className={`skeleton-bg ${isSkeleton ? styles.skeletonBg : styles.skeletonDont}`} />
          <div className={styles.value}>
            <h4>
              {customDaysMatch
                ? customDaysMatch.split(" ")[0]
                : customHoursMatch
                ? customHoursMatch.split(" ")[0]
                : 0}
            </h4>
          </div>
          <div className={styles.text}>
            <p>
              {customDaysMatch
                ? customDaysMatch.split(" ")[1]
                : customHoursMatch
                ? customHoursMatch.split(" ")[1]
                : t("time.hours")}
            </p>
          </div>

          {customHoursMatch && (
            <>
              <div className={styles.value}>
                <h4>{customHoursMatch.split(" ")[0]}</h4>
              </div>
              <div className={styles.text}>
                <p>{customHoursMatch.split(" ")[1]}</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.select}>
          <div className={`skeleton-bg ${isSkeleton ? styles.skeletonBg : styles.skeletonDont}`} />
          <DaysSlider
            value={customDays}
            min={1}
            max={365 * 2}
            step={1}
            disabled={isSkeleton}
            onChange={setCustomDays}
          />
        </div>

        <div className={styles.footer}>
          <div className={styles.descr}>
            <div className={`skeleton-bg ${isSkeleton ? styles.skeletonBg : styles.skeletonDont}`} />
            <p>
              1 day = 10p. Every 10 days <span>sale +2%.</span>
              <br />
              Max sale: <span>40%</span>
            </p>
          </div>
          <div className={styles.button}>
            <div className={`skeleton-bg ${isSkeleton ? styles.skeletonBg : styles.skeletonDont}`} />
            <button disabled={isSkeleton} onClick={() => onClickCustom(customDays, 140)}>
              <h4>140р</h4>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};