type ToastType = 'success' | 'error';

type ToastListener = (
  icon: any,
  title: string,
  description: string,
  type: ToastType
) => void;

class ToastManager {
  private listeners: ToastListener[] = [];

  subscribe(listener: ToastListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  showToast(
    icon: any,
    title: string,
    description: string,
    type: ToastType = 'success'
  ) {
    this.listeners.forEach(l => l(
      icon,
      title,
      description,
      type
    ));
  }
}

export const toastManager = new ToastManager();

export const showSuccessToast = (
  icon: any,
  title: string,
  description: string
) => toastManager.showToast(
  icon,
  title,
  description,
  'success'
);
export const showErrorToast = (
  icon: any,
  title: string,
  description: string
) => toastManager.showToast(
  icon,
  title,
  description,
  'error'
);