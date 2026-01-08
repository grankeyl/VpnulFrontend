import React, { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type ModalName = string;
type AnyProps = Record<string, any>;

type ModalItem = { id: string; name: ModalName; props?: AnyProps; closing?: boolean };

type ModalAPI = {
  open: <P extends AnyProps>(name: ModalName, props?: P) => string;
  close: (id?: string) => void;      // если без id — закроет верхнюю
  closeAll: () => void;
};

const ModalCtx = createContext<ModalAPI | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider />");
  return ctx;
};

type Registry = Record<ModalName, React.FC<any>>;

const ANIM_MS = 420; // длительность анимации закрытия

export function ModalProvider({
  children,
  registry,
}: {
  children: React.ReactNode;
  registry: Registry;
}) {
  const [stack, setStack] = useState<ModalItem[]>([]);

  const api = useMemo<ModalAPI>(() => ({
    open: (name, props) => {
      const id = crypto.randomUUID?.() ?? String(Date.now() + Math.random());
      setStack((s) => [...s, { id, name, props, closing: false }]);
      return id;
    },
    close: (id) => {
        let targetId: string | undefined;

        setStack((s) => {
            if (!s.length) return s;
            targetId = id ?? s[s.length - 1].id;
            return s.map((m) => (m.id === targetId ? { ...m, closing: true } : m));
        });

        window.setTimeout(() => {
            if (!targetId) return;
            setStack((s) => s.filter((m) => m.id !== targetId));
        }, 450);
    },
    closeAll: () => {
        setStack((s) => s.map((m) => ({ ...m, closing: true })));
        window.setTimeout(() => setStack([]), ANIM_MS);
    },
  }), []);

  const modalRoot = typeof document !== "undefined" ? document.body : null;

  return (
    <ModalCtx.Provider value={api}>
      {children}

      {modalRoot &&
        createPortal(
          <>
            {stack.map((m, idx) => {
              const Comp = registry[m.name];
              if (!Comp) return null;
              const isTop = idx === stack.length - 1;
              return (
                <Comp
                  key={m.id}
                  {...m.props}
                  isTop={isTop}
                  closing={!!m.closing}
                  onClose={() => api.close(m.id)}
                />
              );
            })}
          </>,
          modalRoot
        )}
    </ModalCtx.Provider>
  );
}