import { useDispatch, useSelector } from 'react-redux';
import {
  addEvent,
  removeEvent,
  setActiveEvent,
  setEvents,
  updateEvent,
  RootState,
  AppDispatch,
} from '@/store';
import type { CalEvent } from '@/types/calendar';

export const useCalendarStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeEvent = useSelector(
    (state: RootState) => state.calendar.activeEvent
  );
  const calendarEvents = useSelector(
    (state: RootState) => state.calendar.events
  );

  const setCalendarEvents = (events: CalEvent[]) => {
    dispatch(setEvents(events));
  };

  const startSavingEvent = async (event: Partial<CalEvent>) => {
    // TODO : Create backend

    if (event.id !== undefined) {
      // We are updating
      const resEvent = await fakeBackendCall(event);
      updateCalendarEvent(resEvent);
    } else {
      // We are creating
      const resEvent = await fakeBackendCall(event);
      addCalendarEvent(resEvent);
    }
  };

  const addCalendarEvent = (event: CalEvent) => {
    dispatch(addEvent(event));
  };

  const updateCalendarEvent = (event: CalEvent) => {
    dispatch(updateEvent(event));
  };

  const startRemovingEvent = async () => {
    // TODO : Create backend

    if (activeEvent !== null) {
      const resEvent = await fakeBackendCall(activeEvent);
      const { id } = resEvent;
      removeCalendarEvent(id);
    }
  };

  const removeCalendarEvent = (id: string) => {
    dispatch(removeEvent(id));
  };

  const setActiveCalendarEvent = (event: Partial<CalEvent>) => {
    dispatch(setActiveEvent(event));
  };

  const clearActiveCalendarEvent = () => {
    dispatch(setActiveEvent(null));
  };

  const hasEventSelected = activeEvent !== null;

  return {
    //* Properties
    activeEvent,
    events: calendarEvents,
    hasEventSelected,

    //* Methods
    setCalendarEvents,
    startSavingEvent,
    addCalendarEvent,
    updateCalendarEvent,
    startRemovingEvent,
    removeCalendarEvent,
    setActiveCalendarEvent,
    clearActiveCalendarEvent,
  } as const;
};

const fakeBackendCall = async (event: Partial<CalEvent>): Promise<CalEvent> => {
  const promise = new Promise<CalEvent>((resolve) => {
    const newEvent: CalEvent = {
      ...(event as CalEvent),
      id: event.id ?? new Date().getTime().toString(),
    };
    setTimeout(() => resolve(newEvent), 1000);
  });

  // eslint-disable-next-line no-return-await
  return await promise;
};
