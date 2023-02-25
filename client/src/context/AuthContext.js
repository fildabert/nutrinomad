import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const ACTIONS = {
  SIGNIN: 'sign-in',
  SIGNOUT: 'sign-out',
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGNIN:
      //payload is all variables
      return { user: action.payload };
    case ACTIONS.SIGNOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    //check if user is signed in in local storage
    if (user) {
      dispatch({ type: ACTIONS.SIGNIN, payload: user });
    }
  }, []);

  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
