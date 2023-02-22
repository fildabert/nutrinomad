import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import LandingPage from './pages/LandingPage';
import BodyMetrics from './pages/BodyMetrics';
import ActivityLevel from './pages/ActivityLevel';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { AuthContextProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/create/body-metrics',
    element: <BodyMetrics />,
  },
  {
    path: '/create/activity-level',
    element: <ActivityLevel />,
  },
  {
    path: '/create/sign-up',
    element: <SignUp />,
  },
  {
    path: '/create/sign-in',
    element: <SignIn />,
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#00b900',
    },
    secondary: {
      main: '#e4f9ff',
    },
  },
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
