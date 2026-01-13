import { TFunction } from 'i18next';

import TelegramModule from "../hooks/useTelegram";

function declensionLocalized(number: number, t: TFunction, key: string): string {
  const forms: [string, string, string] = t(key, { returnObjects: true }) as any;
  const cases = [2, 0, 1, 1, 1, 2];
  return forms[
    (number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]
  ];
}

export const getImageUrl = (path: string) => {
  return `${import.meta.env.VITE_APP_S3_URL}/${path}`;
};

export function inviteFriend(code: string) {
  if (!code) return;
  const miniAppLink = import.meta.env.VITE_APP_MINI_APP_LINK;
  const link = `${miniAppLink}=${code}`;
  const message = 'Invite friends';
  TelegramModule.useShare(link, message);
}

export function formatTimeLocalized(hours: number, t: TFunction): string {
  if (hours < 0) throw new Error("0 hours");

  const DAY = 24;
  const WEEK = 168;
  const MONTH = 720;
  const YEAR = 8640;

  if (hours < DAY) {
    const h = Math.round(hours);
    return `${h} ${declensionLocalized(h, t, 'time.hours')}`;
  }

  if (hours < WEEK) {
    const d = Math.round(hours / DAY);
    return `${d} ${declensionLocalized(d, t, 'time.days')}`;
  }

  if (hours < MONTH) {
    const w = Math.round(hours / WEEK);
    return `${w} ${declensionLocalized(w, t, 'time.weeks')}`;
  }

  if (hours < YEAR) {
    const m = Math.round(hours / MONTH);
    return `${m} ${declensionLocalized(m, t, 'time.months')}`;
  }

  const y = Math.round(hours / YEAR);
  return `${y} ${declensionLocalized(y, t, 'time.years')}`;
}

export function formatDaysOrHoursLocalized(hours: number, t: TFunction): string {
  if (hours < 0) throw new Error("0 hours");

  const HOURS_IN_DAY = 24;

  if (hours < HOURS_IN_DAY) {
    // меньше одного дня — только часы
    const h = Math.floor(hours);
    return `${h} ${declensionLocalized(h, t, 'time.hours')}`;
  } else {
    // один день и больше — только дни
    const days = Math.floor(hours / HOURS_IN_DAY);
    return `${days} ${declensionLocalized(days, t, 'time.days')}`;
  }
}

export function inviteFriendsLocalized(count: number, t: TFunction): string {
  if (count < 0) throw new Error("0 friends");

  const forms: [string, string, string] = t('friends', { returnObjects: true }) as any;
  const cases = [2, 0, 1, 1, 1, 2];
  const form = forms[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];

  return `${count} ${form}`;
}

export function timeLeftMoscow(unixTimestampSeconds: number): { hours: number, minutes: number } {
  const now = new Date();
  // текущее время в Москве
  const nowMoscow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
  
  const endDate = new Date(unixTimestampSeconds * 1000); // переводим в миллисекунды
  const diffMs = endDate.getTime() - nowMoscow.getTime(); // разница в миллисекундах

  if (diffMs <= 0) return { hours: 0, minutes: 0 };

  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}