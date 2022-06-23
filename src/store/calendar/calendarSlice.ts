import addHours from 'date-fns/addHours';
import type { CalEvent } from '@/types/calendar';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalendarState {
  events: CalEvent[];
  activeEvent: Partial<CalEvent> | null;
}

const events: CalEvent[] = [
  {
    id: '71bc90e430e5',
    title: 'Boss\'s birthday',
    notes: 'We got to buy a birthday cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      id: 'wed48hbfqaa',
      name: 'Daniel Cortez',
    },
  },
];

const initialState: CalendarState = {
  events,
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalEvent>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    updateEvent: (state, action: PayloadAction<CalEvent>) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      state.events[index] = {
        ...state.events[index],
        ...action.payload,
      };
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      // ? Can also be rewritten to not having payload, and using
      // ? the active one
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
      state.activeEvent = null;
    },
    setActiveEvent: (
      state,
      action: PayloadAction<Partial<CalEvent> | null>
    ) => {
      state.activeEvent = action.payload;
    },
  },
});

export const { addEvent, removeEvent, setActiveEvent, setEvents, updateEvent } =
  calendarSlice.actions;
