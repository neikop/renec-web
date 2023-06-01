import { AppProvider } from 'containers';
import { AuthLayout, PrivateLayout } from 'layouts';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path='/auth/*' element={<AuthLayout />} />
        <Route path='/*' element={<PrivateLayout />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
