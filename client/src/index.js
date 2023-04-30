import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import LandingPage from './pages/app/LandingPage';
import SignIn from './pages/auth/SignIn';
import { AuthContextProvider } from './context/AuthContext';
import SignUpSuccess from './components/auth/SignUpSuccess';

import FoodDiary from './pages/app/FoodDiary';
import FoodSearch from './pages/app/FoodSearch';
import { MealContextProvider } from './context/MealContext';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/app/Dashboard';
import Profile from './pages/app/Profile';
import { UserContextProvider } from './context/UserContext';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import ErrorPage from './pages/app/ErrorPage';
import ArticlesPage from './pages/app/ArticlesPage';
import Article from './pages/app/Article';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
  components: {
    MuiDialog: {
      defaultProps: {
        container: document.querySelector('#root'),
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <UserContextProvider>
          <MealContextProvider>
            <SnackbarProvider maxSnack={4} preventDuplicate>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up/success" element={<SignUpSuccess />} />
                  <Route path="/food/diary" element={<FoodDiary />} />
                  <Route path="/food/search" element={<FoodSearch />} />
                  <Route path="/food/dashboard" element={<Dashboard />} />
                  <Route path="/user/profile" element={<Profile />} />
                  <Route path="/articles" element={<ArticlesPage />} />
                  <Route path="/articles/:title" element={<Article />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </BrowserRouter>
            </SnackbarProvider>
          </MealContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
