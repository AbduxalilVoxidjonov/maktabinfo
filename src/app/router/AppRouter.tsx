import { Navigate, Route, Routes } from 'react-router-dom';
import { UserLayout } from '../../shared/components/layout';
import { KatalogDetailPage, KatalogPage } from '../../pages/user/katalog';
import { MalumotYuborishPage } from '../../pages/user/malumot-yuborish';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ROUTES } from './routes';

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<Navigate to={ROUTES.katalog} replace />} />

      <Route element={<UserLayout />}>
        <Route path={ROUTES.katalog} element={<KatalogPage />} />
        <Route path={ROUTES.katalogDetail} element={<KatalogDetailPage />} />
        <Route path={ROUTES.malumotYuborish} element={<MalumotYuborishPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
