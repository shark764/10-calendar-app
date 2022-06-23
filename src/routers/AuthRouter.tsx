import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/modules/auth';

const AuthRouter = () => (
  <Routes>
    <Route path="login" element={<LoginPage />} />
    <Route path="*" element={<Navigate to="login" replace />} />
  </Routes>
);

export default AuthRouter;
