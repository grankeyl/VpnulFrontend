import React from "react";
import styles from "./style.module.scss";

import CloseIcon from "../../icons/Close";

export function ModalShell({
  onClose,
  onExited,
  closing,
  children,
}: {
  onClose: () => void;
  onExited?: () => void;
  closing?: boolean;
  children: React.ReactNode;
}) {
  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => setOpened(true));
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [onClose]);

  return (
    <div
      className={[
        styles.overlay,
        opened ? styles.overlayOpen : "",
        closing ? styles.overlayClosing : "",
      ].join(" ")}
      onMouseDown={onClose}
    >
      <div
        className={[
          styles.modal,
          opened ? styles.modalOpen : "",
          closing ? styles.modalClosing : "",
        ].join(" ")}
        onMouseDown={(e) => e.stopPropagation()}
        onTransitionEnd={(e) => {
            if (!closing) return;
            if (e.target !== e.currentTarget) return;

            const p = e.propertyName;
            if (p !== "transform" && p !== "-webkit-transform") return;

            onExited?.();
        }}
      >
        <div className={styles.inner}>
            <div className={styles.close}>
                <button>
                    <CloseIcon />
                </button>
            </div>
            <div className={styles.top}>
                <div className={styles.thumb}></div>
            </div>
            <div className={styles.cnt}>
                {children}
            </div>
        </div>
      </div>
    </div>
  );
}