import _formatInTimeZone from 'date-fns-tz/formatInTimeZone';

import _floor from 'lodash/floor';
import _isDate from 'lodash/isDate';
import _isNaN from 'lodash/isNaN';
import _toNumber from 'lodash/toNumber';

// requireActual ensures you get the real file instead of an automock
// we use import type and <typeof ...> to still get types
import type * as DateUtils from '../date-utils';
const {
  getCurrentTimeZone,
  getLocaleTimezone,
  getDateTimeFormat,
  gregorianToDate,
  toFriendlyDate,
  unixToDate,
} = jest.requireActual<typeof DateUtils>('../date-utils');

jest.mock('lodash/floor', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));
jest.mock('lodash/isDate', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));
jest.mock('lodash/isNaN', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));
jest.mock('lodash/toNumber', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));
jest.mock('date-fns-tz/formatInTimeZone', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));

(_isNaN as jest.Mock).mockReturnValue(false);
(_isDate as unknown as jest.Mock).mockReturnValue(true);
(_formatInTimeZone as jest.Mock).mockReturnValue('22 July, 2022');

const pAccount: DateUtils.CommlandAccount = {
  timezone: 'America/Los_Angeles',
};
const pUser: DateUtils.CommlandUser = {
  timezone: 'America/El_Salvador',
  ui_flags: {
    date_format: 'ymd',
    twelve_hours_mode: true,
  },
};
const pFormat: DateUtils.DateTimeFormat = 'calendarDate';
const pTimestamp = '63825728730';
const pUnixTimestamp = '1658509530';
const pDateString = '2022-07-22T17:05:30.000Z';
const pDate = new Date(pDateString);
const pIsGregorian = true;
const pTz = 'America/El_Salvador';

describe('Date Utilities', () => {
  const originalIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: jest
          .fn()
          .mockImplementation(() => ({ timeZone: 'Europe/Luxembourg' })),
      }),
    } as any;
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.Intl = originalIntl;
    jest.clearAllMocks();
  });

  describe('Getting browser locale timezone', () => {
    it('should return Europe/Luxembourg', () => {
      expect(getLocaleTimezone()).toEqual('Europe/Luxembourg');
    });
  });

  describe('Getting current session timezone', () => {
    it("should return user's timezone (America/El_Salvador)", () => {
      expect(getCurrentTimeZone({ pAccount, pUser })).toEqual(
        'America/El_Salvador'
      );
    });

    it("should return account's timezone (America/Los_Angeles)", () => {
      expect(
        getCurrentTimeZone({
          pAccount,
          pUser: { ...pUser, timezone: undefined },
        })
      ).toEqual('America/Los_Angeles');
    });

    it("should return account's timezone (Europe/Luxembourg)", () => {
      expect(
        getCurrentTimeZone({
          pAccount: { ...pAccount, timezone: undefined },
          pUser: { ...pUser, timezone: undefined },
        })
      ).toEqual('Europe/Luxembourg');
    });
  });

  describe('Getting dateTime format strings', () => {
    it('should return "dd MMMM, yyyy"', () => {
      expect(getDateTimeFormat({ pUser, pFormat })).toEqual('dd MMMM, yyyy');
    });
    it('should return "MMMM dd, yyyy"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          date_format: 'mdy',
        },
      };
      expect(getDateTimeFormat({ pUser: testUser, pFormat })).toEqual(
        'MMMM dd, yyyy'
      );
    });
    it('should return "yyyy/MM/dd"', () => {
      expect(getDateTimeFormat({ pUser, pFormat: 'date' })).toEqual(
        'yyyy/MM/dd'
      );
    });
    it('should return "dd/MM/yyyy"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          date_format: 'dmy',
        },
      };
      expect(getDateTimeFormat({ pUser: testUser, pFormat: 'date' })).toEqual(
        'dd/MM/yyyy'
      );
    });
    it('should return "MM/dd/yyyy"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          date_format: undefined,
        },
      };
      expect(getDateTimeFormat({ pUser: testUser, pFormat: 'date' })).toEqual(
        'MM/dd/yyyy'
      );
    });
    it('should return "yyyy/MM/dd - hh:mm:ss a"', () => {
      expect(getDateTimeFormat({ pUser, pFormat: 'dateTime' })).toEqual(
        'yyyy/MM/dd - hh:mm:ss a'
      );
    });
    it('should return "yyyy/MM/dd - HH:mm:ss"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          date_format: 'dmy',
          twelve_hours_mode: false,
        },
      };
      expect(
        getDateTimeFormat({ pUser: testUser, pFormat: 'dateTime' })
      ).toEqual('dd/MM/yyyy - HH:mm:ss');
    });
    it('should return "yy/MM/dd"', () => {
      expect(getDateTimeFormat({ pUser, pFormat: 'shortDate' })).toEqual(
        'yy/MM/dd'
      );
    });
    it('should return "yy/MM/dd hh:mm a"', () => {
      expect(getDateTimeFormat({ pUser, pFormat: 'shortDateTime' })).toEqual(
        'yy/MM/dd hh:mm a'
      );
    });
    it('should return "yy/MM/dd HH:mm"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          date_format: 'dmy',
          twelve_hours_mode: false,
        },
      };
      expect(
        getDateTimeFormat({ pUser: testUser, pFormat: 'shortDateTime' })
      ).toEqual('dd/MM/yy HH:mm');
    });
    it('should return "hh:mm a"', () => {
      expect(getDateTimeFormat({ pUser, pFormat: 'shortTime' })).toEqual(
        'hh:mm a'
      );
    });
    it('should return "H"H:mm"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          twelve_hours_mode: false,
        },
      };
      expect(
        getDateTimeFormat({ pUser: testUser, pFormat: 'shortTime' })
      ).toEqual('HH:mm');
    });
    it('should return "hh:mm:ss a"', () => {
      expect(getDateTimeFormat({ pUser, pFormat: 'time' })).toEqual(
        'hh:mm:ss a'
      );
    });
    it('should return "HH:mm:ss"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          twelve_hours_mode: false,
        },
      };
      expect(getDateTimeFormat({ pUser: testUser, pFormat: 'time' })).toEqual(
        'HH:mm:ss'
      );
    });
  });

  describe('Converting gregorian timestamp to Date object', () => {
    it('should return Date object from gregorian timestamp', () => {
      expect(gregorianToDate(pTimestamp)).toEqual(pDate);
    });
    it('should throw an error when "undefined" is passed as parameter', () => {
      (_isNaN as jest.Mock).mockReturnValueOnce(true);
      expect(() => {
        gregorianToDate(undefined as any);
      }).toThrow(`undefined is not a valid number`);
    });
    it('should throw an error when an invalid value is passed as parameter', () => {
      (_isNaN as jest.Mock).mockReturnValueOnce(true);
      expect(() => {
        gregorianToDate(`random-text${pTimestamp}`);
      }).toThrow(`random-text${pTimestamp} is not a valid number`);
    });
  });

  describe('Converting unix timestamp seconds to Date object', () => {
    it('should return Date object from unix timestamp number', () => {
      expect(unixToDate(pUnixTimestamp)).toEqual(pDate);
    });
    it('should throw an error when "undefined" is passed as parameter', () => {
      (_isNaN as jest.Mock).mockReturnValueOnce(true);
      expect(() => {
        unixToDate(undefined as any);
      }).toThrow(`undefined is not a valid number`);
    });
    it('should throw an error when an invalid value is passed as parameter', () => {
      (_isNaN as jest.Mock).mockReturnValueOnce(true);
      expect(() => {
        unixToDate(`random-text${pUnixTimestamp}`);
      }).toThrow(`random-text${pUnixTimestamp} is not a valid number`);
    });
  });

  describe('Getting friendly date format', () => {
    it('should return date formatted to "calendarDate"', () => {
      expect(
        toFriendlyDate({
          pAccount,
          pDate,
          pIsGregorian,
          pUser,
          pFormat,
          pTz,
        })
      ).toEqual('22 July, 2022');
    });
    it('should return gregorian timestamp formatted to "shortDateTime"', () => {
      (_isDate as unknown as jest.Mock).mockReturnValueOnce(false);
      (_formatInTimeZone as jest.Mock).mockReturnValueOnce('22/07/22 11:05 AM');
      expect(
        toFriendlyDate({
          pAccount,
          pDate: pTimestamp,
          pIsGregorian,
          pUser,
          pFormat: 'shortDateTime',
          pTz,
        })
      ).toEqual('22/07/22 11:05 AM');
    });
    it('should return unix timestamp formatted to "dateTime"', () => {
      const testUser: DateUtils.CommlandUser = {
        ...pUser,
        ui_flags: {
          ...pUser.ui_flags,
          date_format: 'mdy',
          twelve_hours_mode: false,
        },
      };
      (_isDate as unknown as jest.Mock).mockReturnValueOnce(false);
      (_formatInTimeZone as jest.Mock).mockReturnValueOnce(
        '07/22/2022 - 11:05:30'
      );
      expect(
        toFriendlyDate({
          pAccount,
          pDate: pUnixTimestamp,
          pIsGregorian: false,
          pUser: testUser,
          pFormat: 'dateTime',
        })
      ).toEqual('07/22/2022 - 11:05:30');
    });
    it('should return empty string when undefined is passed as date', () => {
      expect(
        toFriendlyDate({
          pAccount,
          pDate: undefined as any,
          pIsGregorian,
          pUser,
          pFormat,
          pTz,
        })
      ).toEqual('');
    });
    it('should return empty string when null is passed as date', () => {
      expect(
        toFriendlyDate({
          pAccount,
          pDate: null as any,
          pUser,
          pFormat,
        })
      ).toEqual('');
    });
  });
});

// required to avoid "isolatedModules" linting with error
export {};
