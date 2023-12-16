import { ChakraBaseProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/404.tsx';
import Backoffice from './pages/Backoffice.tsx';
import LandingPage from './pages/LandingPage.tsx';
import QRResultPage from './pages/QRResultPage.tsx';
import QRScanPage from './pages/QRScanPage.tsx';
import theme from './themes/theme.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/qr/result',
    element: <QRResultPage />,
  },
  {
    path: '/qr/scan',
    element: <QRScanPage />,
  },
  {
    path: '/backoffice',
    element: <Backoffice />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraBaseProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraBaseProvider>
);
