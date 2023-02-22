import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const ACTIONS = {
  SIGNIN: 'sign-in',
  SIGNUP: 'sign-up',
  LOGOUT: 'log-out',
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGNIN:
      return { user: action.payload };
    case ACTIONS.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
