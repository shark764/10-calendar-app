import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import intervalToDuration from 'date-fns/intervalToDuration';
import _floor from 'lodash/floor';
import _isNaN from 'lodash/isNaN';
import _isNumber from 'lodash/isNumber';
import _isString from 'lodash/isString';
import _parseInt from 'lodash/parseInt';

/**
 * Returns the timezone of the currently authenticated session
 * @return {String}  Current time zone identifier.
 *
 * By default, the time zone of the logged in user will be returned. If that time zone is not
 * set, then the account time zone will be used. If not set, the browser’s time zone will be
 * used as a last resort.
 */
function getCurrentTimeZone () {
  return (
    _.get(monster, 'apps.auth.currentUser.timezone') ||
    _.get(monster, 'apps.auth.currentAccount.timezone') ||
    moment.tz.guess()
  );
}

/**
 * Determine the date format from a specific or current user's settings
 * @private
 * @param  {String} pFormat Specific format for the user
 * @param  {Object} pUser   Specific user to get format from
 * @return {String}         Computed representation of the format
 */
function getMomentFormat (pFormat, pUser) {
  const format = _.isString(pFormat) ? pFormat : 'dateTime';
  const user = _.isObject(pUser)
    ? pUser
    : _.get(monster, 'apps.auth.currentUser', {});
  const hourFormat = _.get(user, 'ui_flags.twelve_hours_mode', false)
    ? '12h'
    : '24h';
  const dateFormat = _.get(user, 'ui_flags.date_format', 'mdy');
  const dateFormats = {
    dmy: 'DD/MM/YYYY',
    mdy: 'MM/DD/YYYY',
    ymd: 'YYYY/MM/DD',
  };
  const hourFormats = {
    '12h': 'hh',
    '24h': 'HH',
  };
  const shortcuts = {
    calendarDate: `${dateFormat === 'mdy' ? 'MMMM DD' : 'DD MMMM'}, YYYY`,
    date: dateFormats[dateFormat],
    dateTime: dateFormats[dateFormat].concat(
      ' - ',
      hourFormats[hourFormat],
      ':mm:ss'
    ),
    shortDate: dateFormats[dateFormat].replace('YYYY', 'YY'),
    shortDateTime: dateFormats[dateFormat]
      .replace('YYYY', 'YY')
      .concat(' ', hourFormats[hourFormat], ':mm'),
    shortTime: `${hourFormats[hourFormat]}:mm`,
    time: `${hourFormats[hourFormat]}:mm:ss`,
  };
  if (!_.includes(_.keys(shortcuts), format)) {
    throw new Error(
      '`format` must be one of '.concat(
        _.keys(shortcuts).join(', '),
        ' or undefined'
      )
    );
  }
  if (
    hourFormat === '12h' &&
    _.includes(['shortDateTime', 'dateTime', 'shortTime', 'time'], format)
  ) {
    return `${shortcuts[format]} A`;
  }
  return shortcuts[format];
}

/**
 * Converts a Gregorian timestamp into a Date instance
 * @param  {Number} pTimestamp Gregorian timestamp
 * @return {Date}           Converted Date instance
 */
function gregorianToDate (pTimestamp) {
  const timestamp = _.isString(pTimestamp)
    ? _.parseInt(pTimestamp)
    : pTimestamp;
  if (_.isNaN(timestamp) || !_.isNumber(timestamp)) {
    throw new Error('`timestamp` is not a valid Number');
  }
  return new Date((_.floor(timestamp) - 62167219200) * 1000);
}

/**
 * Formats a Gregorian/Unix timestamp or Date instances into a String
 * representation of the corresponding date.
 * @param  {Date|String} pDate   Representation of the date to format.
 * @param  {String} pFormat      Tokens to format the date with.
 * @param  {Object} pUser        Specific user to use for formatting.
 * @param  {Boolean} pIsGregorian Indicate whether or not the date is in gregorian format.
 * @param  {String} pTz           Timezone to format the date with.
 * @return {String}              Representation of the formatted date.
 *
 * If pDate is undefined then return an empty string. Useful for form which use toFriendlyDate
 * for some fields with an undefined value. Otherwise it would display NaN/NaN/NaN in Firefox
 * for example.
 *
 * By default, the timezone of the specified or logged in user will be used to format the date.
 * If that timezone is not set, then the account timezone will be used. If not set, the
 * browser’s timezone will be used as a last resort.
 */
function toFriendlyDate (pDate, pFormat, pUser, pIsGregorian, pTz) {
  if (_.isUndefined(pDate)) {
    return '';
  }
  const isGregorian = _.isBoolean(pIsGregorian) ? pIsGregorian : true;
  const date = _.isDate(pDate)
    ? pDate
    : isGregorian
      ? gregorianToDate(pDate)
      : unixToDate(pDate);
  const format = getMomentFormat(pFormat, pUser);
  const tz = _.isNull(moment.tz.zone(pTz)) ? getCurrentTimeZone() : pTz;
  return moment(date).tz(tz).format(format);
}

/**
 * Converts a Unix timestamp into a Date instance
 * @param  {Number} pTimestamp Unix timestamp
 * @return {Date}           Converted Date instance
 *
 * Sometimes Unix times are defined with more precision, such as with the /legs API which
 * returns channel created time in microseconds, so we need need to remove this extra precision
 * to use the Date constructor.
 *
 * If we only get the "seconds" precision, we need to multiply it by 1000 to get milliseconds in
 * order to use the Date constructor.
 */
function unixToDate (pTimestamp) {
  const max = 9999999999999;
  const min = 10000000000;
  let timestamp = _.isString(pTimestamp) ? _.parseInt(pTimestamp) : pTimestamp;
  if (_.isNaN(timestamp) || !_.isNumber(timestamp)) {
    throw new Error('`timestamp` is not a valid Number');
  }
  while (timestamp > max || timestamp < min) {
    if (timestamp > max) {
      timestamp /= 1000;
    }
    if (timestamp < min) {
      timestamp *= 1000;
    }
  }
  return new Date(timestamp);
}
