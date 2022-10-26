import type { EventProps } from 'react-big-calendar';
import type { CalEvent } from '@/types/calendar';

// class Notification {
//   name: string;
//   options: { body: string };
//   static permission: string;

//   constructor(name: string, options: { body: string }) {
//     this.name = name;
//     this.options = options;
//   }

//   get() {
//     return this.name;
//   }
// }

// interface Event {
//   message: {
//     user: {
//       id: string;
//       username: string;
//       name: string;
//     } | null;
//   };
// }

const CalendarEvent = ({ event }: EventProps<CalEvent>) => {
  const { title, user } = event;
  // const client = { user: { id: '1' } };

  // const handleNewMessageEvent = (event: Event) => {
  //   if (Notification.permission !== 'granted') {
  //     return;
  //   }
  //   const currentUser = client.user.id;
  //   const { message } = event;
  //   const { user = null } = message;

  //   if (!(user !== null && currentUser !== user.id)) {
  //     return;
  //   }
  //   const title = user.name ?? user.username;
  //   const body = t('common.notification');

  //   // By the way this line triggers this error
  //   // Do not use 'new' for side effects.
  //   // You shouldn't create instance of classes
  //   // without storing them to a reference
  //   new Notification(title, { body });
  // };

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};

export default CalendarEvent;
