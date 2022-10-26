import { useState } from 'react';
import { Calendar, View } from 'react-big-calendar';
import {
  CommlandAccount,
  CommlandUser,
  DateTimeFormat,
  getCurrentTimeZone,
  getLocaleTimezone,
  getDateTimeFormat,
  gregorianToDate,
  toFriendlyDate,
  unixToDate,
} from '@/date-utils';
import { localizer } from '@/helpers';
import { useCalendarStore, useUIStore } from '@/hooks';
import InputMeter from '@/InputMeter';
import type { CalEvent } from '@/types/calendar';
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  Navbar,
  FabDelete,
  Tooltip,
} from '../components';
import type { DirectionTip } from '../components/Tooltip';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-page.scss';

const LAST_VIEW_STORAGE_ITEM = 'lastView';
const DEFAULT_VIEW: View = 'day';

const pAccount: CommlandAccount = {
  timezone: 'America/El_Salvador',
};
const pUser: CommlandUser = {
  timezone: 'America/El_Salvador',
  ui_flags: {
    date_format: 'mdy',
    twelve_hours_mode: false,
  },
};
const pFormat: DateTimeFormat = 'dateTime';
const pTimestamp = '63825728730';
const pDateString = '2022-07-22T17:05:30.000Z';
const pDate = new Date(pDateString);
const pIsGregorian = true;
const pTz = 'America/El_Salvador';

// const { timezone } = await KazooSDK.getAccountInformation();

// export async function getCurrentUser() {
//   const {
//     data: { data },
//   } = await KazooSDK.getUser();
//   return data;
// }

console.log({
  getCurrentTimeZone: getCurrentTimeZone({ pAccount, pUser }),
  getLocaleTimezone: getLocaleTimezone(),
  getDateTimeFormat: getDateTimeFormat({ pUser, pFormat }),
  gregorianToDate: gregorianToDate(pTimestamp),
  // gregorianToDate: gregorianToDate(undefined as any),
  toFriendlyDate: toFriendlyDate({
    pAccount,
    pDate,
    pIsGregorian,
    pUser,
    pFormat,
    pTz,
  }),
  unixToDate: unixToDate(pTimestamp),
});

const CalendarPage = () => {
  const { openModal } = useUIStore();
  const { events, setActiveCalendarEvent, hasEventSelected } =
    useCalendarStore();
  const lastViewFromStorage: View =
    (window.localStorage.getItem(LAST_VIEW_STORAGE_ITEM) as View) ??
    DEFAULT_VIEW;
  const [lastView, setLastView] = useState<View>(lastViewFromStorage);
  const [direction, setDirection] = useState<DirectionTip>('top');

  const eventStyleGetter = (
    event: CalEvent,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    const style = {
      backgroundColor: isSelected ? '#7b6ce9' : '#ea7bc7',
      borderRadius: 6,
      opacity: 0.8,
      color: 'black',
    };

    return {
      style,
    };
  };

  // event: CalEvent,
  // e: SyntheticEvent<HTMLElement, Event>
  const onDoubleClickEvent = () => {
    openModal();
  };

  const onSelectEvent = (
    event: CalEvent
    // e: SyntheticEvent<HTMLElement, Event>
  ) => {
    setActiveCalendarEvent(event);
  };

  const onViewChange = (view: View) => {
    window.localStorage.setItem(LAST_VIEW_STORAGE_ITEM, view);
    setLastView(view);
  };

  // const srcUrl = 'https://github.com/';

  return (
    <div>
      <Navbar />

      <InputMeter
        userDeviceId="e305e27f59841a33a5da7325addb44fb06d3b11b994a135e0b2044a51e1b823b"
        onPermissionError={(err) => console.log(err)}
      />
      <br />
      <select
        name="dir-change"
        value={direction}
        onChange={(e) => setDirection(e.target.value as DirectionTip)}
        title="Change Dir">
        {['top', 'right', 'bottom', 'left'].map((dir) => (
          <option key={dir} value={dir}>
            {dir}
          </option>
        ))}
      </select>
      <br />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Tooltip
          content={`Hey!, look at your ${direction}!`}
          delay={100}
          direction={direction}
          trigger="hover">
          <button type="button">Hover Me</button>
        </Tooltip>
      </div>
      <br />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        className="calendar-screen"
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={onSelectEvent}
        onDoubleClickEvent={onDoubleClickEvent}
        onView={onViewChange}
      />

      {/* The Content Security Policy directive 'frame-ancestors' is ignored when delivered via a <meta> element. */}
      {/* <iframe src={srcUrl} frameBorder="0" title="Github portal" /> */}
      <CalendarModal />
      {hasEventSelected && <FabDelete />}
      <FabAddNew />
    </div>
  );
};

export default CalendarPage;
