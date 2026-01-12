import WebApp from '@twa-dev/sdk';

const TelegramModule = {
    initMiniApp() {
      WebApp.backgroundColor = '#000';
      WebApp.requestWriteAccess();
      WebApp.disableVerticalSwipes();
      WebApp.ready();
      WebApp.expand();
    },

    readyMiniApp() {
      WebApp.ready();
    },

    initDataRaw() {
      if (import.meta.env.VITE_APP_INIT_DATA) {
        return import.meta.env.VITE_APP_INIT_DATA;
      }
      return WebApp.initData;
    },

    initData() {
      if (!WebApp.initDataUnsafe) return;
      return WebApp.initDataUnsafe;
    },

    parseQueryToJSON(qs: string) {
      const s = qs.startsWith('?') ? qs.slice(1) : qs;
      const params = new URLSearchParams(s);
      const out = {} as any;

      for (const [k, v] of params.entries()) {
        let val = v as any;

        if (k === 'user' || k === 'receiver' || k === 'chat' || k.endsWith('_json')) {
          try { val = JSON.parse(val); } catch {}
        } else if (/^-?\d+$/.test(val)) {
          val = Number(val);
        } else if (val === 'true' || val === 'false') {
          val = (val === 'true');
        }
        out[k] = val;
      }
      return out;
    },

    checkStartParam() {
      return WebApp.initDataUnsafe?.start_param || null;
    },

    hideBackButton() {
      const backButton = WebApp.BackButton;
      if (backButton?.isVisible !== undefined) {
        backButton.hide();
      }
    },

    useBackButton(action: any) {
      const backButton = WebApp.BackButton;
      if (backButton?.show && backButton.onClick) {
        backButton.show();
        backButton.onClick(action);
      }
    },

    useRigidHaptic() {
      WebApp.HapticFeedback?.impactOccurred?.('rigid');
    },

    useSoftHaptic() {
      WebApp.HapticFeedback?.impactOccurred?.('soft');
    },

    useLightHaptic() {
      WebApp.HapticFeedback?.impactOccurred?.('light');
    },

    useMediumHaptic() {
      WebApp.HapticFeedback?.impactOccurred?.('medium');
    },

    useHeavyHaptic() {
      WebApp.HapticFeedback?.impactOccurred?.('heavy');
    },

    useNotifyErrorHaptic() {
      WebApp.HapticFeedback?.notificationOccurred?.('error');
    },

    useLink(link: string) {
      WebApp.openTelegramLink(link);
    },

    useTgLink(link: string) {
      WebApp.openLink(link);
    },

    async useShare(url: string, message: string) {
      const encodedUrl = encodeURIComponent(url);
      const encodedMessage = encodeURIComponent(message);
      const shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`;
      WebApp.openTelegramLink(shareLink);
    },

    async useStory(
      media: string, 
      text: string, 
      widget_link: {
        url: string;
        name: string;
      }
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          WebApp.shareToStory(media, {
            text: text,
            widget_link: {
              url: widget_link.url,
              name: widget_link.name,
            },
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },

    async useShareMessage(id: string): Promise<void> {
      return new Promise((resolve, reject) => {
        WebApp.shareMessage(id, (success) => {
          if (success) {
            TelegramModule.useLightHaptic();
            resolve();
          } else {
            reject();
          }
        });
      });
    },

    async useInvoice(invoiceUrl: string, actionSuccess: any, actionError: any) {
      try {
        WebApp.openInvoice(invoiceUrl);

        WebApp.onEvent('invoiceClosed', (event) => {
          if (event.status === 'paid') {
            actionSuccess();
          } else {
            actionError();
          }
        });
      } catch (error) {
        actionError();
      }
    },

    async useSetEmoji(custom_emoji_id: string): Promise<void> {
      WebApp.requestEmojiStatusAccess();

      return new Promise((resolve, reject) => {
        try {
          (WebApp as any).setEmojiStatus({
            custom_emoji_id,
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
};

export default TelegramModule;