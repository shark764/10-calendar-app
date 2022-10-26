import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import {
//   CommlandAccount,
//   CommlandUser,
//   DateTimeFormat,
//   // getCurrentTimeZone,
//   getLocaleTimezone,
//   // getDateTimeFormat,
//   // gregorianToDate,
//   // toFriendlyDate,
//   // unixToDate,
//   capitalize,
// } from '@2600hz/commland-utilities';
import AppRouter from './routers/AppRouter';
import { store } from './store';

// const pAccount: CommlandAccount = {
//   timezone: 'America/El_Salvador',
// };
// const pUser: CommlandUser = {
//   timezone: 'America/El_Salvador',
//   ui_flags: {
//     date_format: 'mdy',
//     twelve_hours_mode: false,
//   },
// };
// const pFormat: DateTimeFormat = 'dateTime';
// const pTimestamp = '63825728730';
// const pDateString = '2022-07-22T17:05:30.000Z';
// const pDate = new Date(pDateString);
// const pIsGregorian = true;
// const pTz = 'America/El_Salvador';

// console.log(pFormat, capitalize('hey there'));

// // const { timezone } = await KazooSDK.getAccountInformation();

// // export async function getCurrentUser() {
// //   const {
// //     data: { data },
// //   } = await KazooSDK.getUser();
// //   return data;
// // }

// console.log({
//   // getCurrentTimeZone: getCurrentTimeZone({ pAccount, pUser }),
//   // getLocaleTimezone: getLocaleTimezone(),
//   // getDateTimeFormat: getDateTimeFormat({ pUser, pFormat }),
//   // gregorianToDate: gregorianToDate(pTimestamp),
//   // // gregorianToDate: gregorianToDate(undefined as any),
//   // gregorianToDate2: gregorianToDate(null as any),
//   // toFriendlyDate: toFriendlyDate({
//   //   pAccount,
//   //   pDate,
//   //   pIsGregorian,
//   //   pUser,
//   //   pFormat,
//   //   pTz,
//   // }),
//   // unixToDate: unixToDate(pTimestamp),
// });

const CalendarApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
);

export default CalendarApp;
