import type { EventProps } from 'react-big-calendar';
import type { CalEvent } from '@/types/calendar';

const CalendarEvent = ({ event }: EventProps<CalEvent>) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};

export default CalendarEvent;
