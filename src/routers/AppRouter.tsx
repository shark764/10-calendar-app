import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import CalendarRouter from './CalendarRouter';

const AppRouter = () => {
  const authStatus =
    // 'not-authenticated';
    'authenticated';

  return (
    <Routes>
      {/* @ts-expect-error */}
      {authStatus === 'not-authenticated'
        ? (
          <Route path="/auth/*" element={<AuthRouter />} />
        )
        : (
          <Route path="/*" element={<CalendarRouter />} />
        )}

      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default AppRouter;
