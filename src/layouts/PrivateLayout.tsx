import { AppHeader } from 'containers';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoute } from 'routes';

const PrivateLayout = () => {
  return (
    <main>
      <AppHeader />
      <Routes>
        {Object.values(privateRoute).map(({ path, component: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        <Route path='*' element={<Navigate to={privateRoute.home.path} />} />
      </Routes>
    </main>
  );
};

export default PrivateLayout;
