import React, { useState, useEffect } from 'react';
import { toastManager } from './toastManager';
import { Notification } from './Notification';

interface ToastItem {
  id: number;
  icon: any;
  title: string;
  description: string;
  type: 'success' | 'error';
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const [timer, setTimer] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((icon, title, description, type) => {
      const id = Date.now();

      if (timer) clearTimeout(timer);

      const newToast: ToastItem = { id, icon, title, description, type };
      setToast(newToast);

      const t = setTimeout(() => setToast(null), 3600);
      setTimer(t);
    });

    return unsubscribe;
  }, [timer]);

  return (
    <>
      {children}
      {toast && (
        <div style={{ 
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: '0 clamp(8px, 3.2vw, var(--padding-indent))',
          paddingTop: 'calc(var(--tg-safe-area-inset-top, -15px) + 72px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <Notification 
            key={toast.id} 
            icon={toast.icon}
            title={toast.title} 
            description={toast.description}
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        </div>
      )}
    </>
  );
};