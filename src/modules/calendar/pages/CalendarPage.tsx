import { useState } from 'react';
import { Calendar, View } from 'react-big-calendar';
import { localizer } from '@/helpers';
import { useCalendarStore, useUIStore } from '@/hooks';
import type { CalEvent } from '@/types/calendar';
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  Navbar,
  FabDelete,
} from '../components';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-page.scss';

const LAST_VIEW_STORAGE_ITEM = 'lastView';
const DEFAULT_VIEW: View = 'day';

const CalendarPage = () => {
  const { openModal } = useUIStore();
  const { events, setActiveCalendarEvent, hasEventSelected } =
    useCalendarStore();
  const lastViewFromStorage: View =
    (window.localStorage.getItem(LAST_VIEW_STORAGE_ITEM) as View) ??
    DEFAULT_VIEW;
  const [lastView, setLastView] = useState<View>(lastViewFromStorage);

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
