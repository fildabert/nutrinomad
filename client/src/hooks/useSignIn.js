import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { ACTIONS } from '../context/AuthContext';

export const useSignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password) => {
    setIsError(null);

    try {
      const response = await axios.post('/api/users/signIn', {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        // save user to local storage
        localStorage.setItem('user', JSON.stringify(data));

        // update Auth Context
        dispatch({ type: ACTIONS.SIGNIN, payload: data });
        setIsError(false);
      }
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.response.data.error);
    }
  };

  return [signIn, isError, errorMessage];
};
