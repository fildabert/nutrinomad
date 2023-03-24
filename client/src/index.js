import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import LandingPage from './pages/app/LandingPage';
import SignIn from './pages/auth/SignIn';
import { AuthContextProvider } from './context/AuthContext';
import SignUpSuccess from './components/auth/SignUpSuccess';

import FoodDiary from './pages/app/FoodDiary';
import FoodSearch from './pages/app/FoodSearch';
import { MealContextProvider } from './context/MealContext';
import SignUp from './pages/auth/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
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
    path: '/food/diary',
    element: <FoodDiary />,
  },
  {
    path: '/food/search',
    element: <FoodSearch />,
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
        <MealContextProvider>
          <RouterProvider router={router} />
        </MealContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
