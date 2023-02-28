import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import { AuthContextProvider } from './context/AuthContext';
import Form from './pages/Form';
import SignUpSuccess from './pages/SignUpSuccess';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/sign-up',
    element: <Form />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up/success',
    element: <SignUpSuccess />,
  },
  {
    path: '/home',
    element: <Home />,
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
