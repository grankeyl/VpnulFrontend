import styles from "./style.module.scss";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange: (v: number) => void;
};

export function DaysSlider({
  value,
  min = 1,
  max = 30,
  step = 1,
  disabled,
  onChange,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setW(el.clientWidth || 0);
    });
    ro.observe(el);
    setW(el.clientWidth || 0);

    return () => ro.disconnect();
  }, []);

  const t = 14;
  const pad = 2;
  const usable = Math.max(0, w - (pad * 2) - t);

  const ratio = max === min ? 0 : (value - min) / (max - min);
  const x = pad + ratio * usable;

  return (
    <div
      ref={rootRef}
      className={`${styles.daysSlider} ${disabled ? styles.disabled : ""}`}
      style={{
        ["--x" as any]: `${x}px`,
        ["--thumb" as any]: `${t}px`,
        ["--pad" as any]: `${pad}px`,
      }}
    >
      <div className={styles.track}>
        <div className={styles.fill} />
        <div className={styles.thumb} />
      </div>

      <input
        className={styles.nativeRange}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        onInput={(e) => onChange(Number((e.target as HTMLInputElement).value))}
      />
    </div>
  );
}