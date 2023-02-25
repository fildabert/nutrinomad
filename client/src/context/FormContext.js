import { createContext, useState } from 'react';

export const FormContext = createContext({});

export const FormContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
  });

  return (
    <FormContext.Provider value={{ page, setPage, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
