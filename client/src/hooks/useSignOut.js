import { ACTIONS } from '../context/AuthContext';
import { useAuthContext } from './useAuthContext';

export const useSignOut = () => {
  const { dispatch } = useAuthContext();

  const signOut = () => {
    // clear user data from local storage
    localStorage.removeItem('user');

    dispatch({ type: ACTIONS.SIGNOUT });
  };

  return { signOut };
};
