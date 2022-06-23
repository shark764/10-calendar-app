import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarPage } from '@/modules/calendar';

const CalendarRouter = () => (
  <Routes>
    <Route index element={<CalendarPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default CalendarRouter;
