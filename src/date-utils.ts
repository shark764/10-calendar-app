import formatInTimeZone from 'date-fns-tz/formatInTimeZone';
import _floor from 'lodash/floor';
import _isDate from 'lodash/isDate';
import _isNaN from 'lodash/isNaN';
import _toNumber from 'lodash/toNumber';
// import type { CalEvent } from './types/calendar';

// const phase = Phase.alpha;
// const cEvent: CalEvent = {};

export type DateTimeFormat =
  | 'calendarDate'
  | 'date'
  | 'dateTime'
  | 'shortDate'
  | 'shortDateTime'
  | 'shortTime'
  | 'time';

export type UserHourMode = '12h' | '24h';
export type UserDateMode = 'dmy' | 'mdy' | 'ymd';

export interface CommlandAccount {
  timezone?: string;
}

export interface CommlandUser {
  timezone?: string;
  ui_flags?: {
    twelve_hours_mode?: boolean;
    date_format?: UserDateMode;
  };
}

const dateFormats = {
  dmy: 'dd/MM/yyyy',
  mdy: 'MM/dd/yyyy',
  ymd: 'yyyy/MM/dd',
};
const hourFormats = {
  '12h': 'hh',
  '24h': 'HH',
};

export function getLocaleTimezone () {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getCurrentTimeZone ({
  pUser,
  pAccount,
}: {
  pUser: CommlandUser;
  pAccount: CommlandAccount;
}) {
  return pUser.timezone ?? pAccount.timezone ?? getLocaleTimezone();
}

export function getDateTimeFormat ({
  pFormat = 'dateTime',
  pUser,
}: {
  pFormat?: DateTimeFormat;
  pUser: CommlandUser;
}) {
  const hourMode = pUser.ui_flags?.twelve_hours_mode ?? false ? '12h' : '24h';
  const dateMode = pUser.ui_flags?.date_format ?? 'mdy';
  const hourFormat = hourFormats[hourMode];
  const dateFormat = dateFormats[dateMode];

  const shortcuts = {
    calendarDate: `${dateMode === 'mdy' ? 'MMMM dd' : 'dd MMMM'}, yyyy`,
    date: dateFormat,
    dateTime: `${dateFormat} - ${hourFormat}:mm:ss`,
    shortDate: dateFormat.replace('yyyy', 'yy'),
    shortDateTime: `${dateFormat.replace('yyyy', 'yy')} ${hourFormat}:mm`,
    shortTime: `${hourFormat}:mm`,
    time: `${hourFormat}:mm:ss`,
  };

  if (!Object.keys(shortcuts).includes(pFormat)) {
    throw new Error(
      `Format "${pFormat}" must be one of ${Object.keys(shortcuts).join(
        ', '
      )} or undefined`
    );
  }

  if (
    hourMode === '12h' &&
    ['shortDateTime', 'dateTime', 'shortTime', 'time'].includes(pFormat)
  ) {
    return `${shortcuts[pFormat]} a`;
  }
  return shortcuts[pFormat];
}

export function gregorianToDate (pTimestamp: number | string) {
  const timestamp = _toNumber(pTimestamp);
  if (_isNaN(timestamp)) {
    throw new Error(`${timestamp} is not a valid number`);
  }

  const date = new Date((_floor(timestamp) - 62167219200) * 1000);
  if (!_isDate(date)) {
    throw new Error(`${timestamp} results in a invalid date`);
  }
  return date;
}

export function unixToDate (pTimestamp: number | string) {
  const max = 9999999999999;
  const min = 10000000000;
  let timestamp = _toNumber(pTimestamp);
  if (_isNaN(timestamp)) {
    throw new Error(`${timestamp} is not a valid number`);
  }
  while (timestamp > max || timestamp < min) {
    if (timestamp > max) {
      timestamp /= 1000;
    }
    if (timestamp < min) {
      timestamp *= 1000;
    }
  }
  const date = new Date(timestamp);
  if (!_isDate(date)) {
    throw new Error(`${timestamp} results in a invalid date`);
  }
  return date;
}

export function toFriendlyDate ({
  pDate,
  pFormat = 'dateTime',
  pUser,
  pAccount,
  pIsGregorian = true,
  pTz,
}: {
  pDate: Date | number | string;
  pFormat?: DateTimeFormat;
  pUser: CommlandUser;
  pAccount: CommlandAccount;
  pIsGregorian?: boolean;
  pTz?: string;
}) {
  if (pDate === undefined || pDate === null) {
    return '';
  }

  let date: Date;
  if (_isDate(pDate)) {
    date = new Date(pDate);
  } else if (pIsGregorian) {
    date = gregorianToDate(pDate);
  } else {
    date = unixToDate(pDate);
  }

  const format = getDateTimeFormat({ pFormat, pUser });
  const tz =
    pTz ??
    getCurrentTimeZone({
      pUser,
      pAccount,
    });
  return formatInTimeZone(date, tz, format);
}
