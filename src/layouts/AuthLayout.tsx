import { Box } from '@mui/material';
import { AppHeader } from 'containers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { authRoute, privateRoute } from 'routes';

const AuthLayout = () => {
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);

  useEffect(() => {
    if (isLoggedIn) {
      navigator(privateRoute.home.path, { replace: true });
    }
  }, [isLoggedIn, navigator]);

  return (
    <main className='bg-[#eef2f6]'>
      <AppHeader />
      <Box
        sx={{
          minHeight: {
            sm: `calc(100vh - 64px)`,
            xs: `calc(100vh - 56px)`,
          },
        }}
        className='flex items-center justify-center'
      >
        <Routes>
          {Object.values(authRoute).map(({ path, component: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          <Route path='*' element={<Navigate to={authRoute.login.url} />} />
        </Routes>
      </Box>
    </main>
  );
};

export default AuthLayout;
