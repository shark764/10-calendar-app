import addHours from 'date-fns/addHours';
import { useCalendarStore, useUIStore } from '@/hooks';
import type { CalEvent } from '@/types/calendar';

import './fa-button.scss';

const newEmptyEvent: Partial<CalEvent> = {
  // id: 'NO-ID',
  title: '',
  start: new Date(),
  end: addHours(new Date(), 2),
  notes: '',
  bgColor: '#fafafa',
  user: {
    id: 'wed48hbfqaa',
    name: 'Daniel Cortez',
  },
};

const FabAddNew = () => {
  const { openModal } = useUIStore();
  const { setActiveCalendarEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveCalendarEvent(newEmptyEvent);
    openModal();
  };

  return (
    <button
      type="button"
      className="btn btn-primary fab"
      onClick={handleClickNew}>
      <i className="fas fa-plus" />
    </button>
  );
};

export default FabAddNew;
