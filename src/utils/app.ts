import { TFunction } from 'i18next';

import * as userApi from "../api/user/user.api";

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

export async function inviteFriend(code: string) {
  if (!code) return;
  const res = await userApi.share();
  if (res.message !== 'ok') return;
  if (res.data) {
    TelegramModule.useShareMessage(res.data.prepared_message_id);
  }
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
  const HOURS_IN_DAY = 24;

  if (hours < HOURS_IN_DAY) {
    const h = Math.ceil(hours);
    return `${h} ${declensionLocalized(h, t, 'time.hours')}`;
  }

  const days = Math.floor((hours + 22) / 24);
  return `${days} ${declensionLocalized(days, t, 'time.days')}`;
}

export function inviteFriendsLocalized(count: number, t: TFunction): string {
  if (count < 0) throw new Error("0 friends");

  const forms: [string, string, string] = t('friends', { returnObjects: true }) as any;
  const cases = [2, 0, 1, 1, 1, 2];
  const form = forms[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];

  return `${count} ${form}`;
}

export function timeLeftMoscow(unixTimestampSeconds: number): number {
  const now = new Date();
  const nowMoscow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
  const endDate = new Date(unixTimestampSeconds * 1000);

  const diffMs = endDate.getTime() - nowMoscow.getTime();
  if (diffMs <= 0) return 0;

  return diffMs / 1000 / 60 / 60; // дробные часы
}

export function formatTimestamp(ms: number) {
  const date = new Date(ms);

  const day = date.getDate();
  const month = date.toLocaleString('en', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${hours}:${minutes}`;
}

export type DeviceType = 'ios' | 'android' | 'mac' | 'windows' | 'other';

export function getDevice(): DeviceType {
  const ua = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && 'ontouchend' in document)) {
    return 'ios';
  }

  // Android
  if (/android/i.test(ua)) {
    return 'android';
  }

  // Windows
  if (/Win/.test(navigator.platform)) {
    return 'windows';
  }

  // macOS
  if (/Mac/.test(navigator.platform)) {
    return 'mac';
  }

  // fallback
  return 'other';
}