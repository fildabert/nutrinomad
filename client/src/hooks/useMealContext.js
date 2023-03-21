import { useContext } from 'react';
import { MealContext } from '../context/MealContext';

const useMealContext = () => {
  const context = useContext(MealContext);

  if (!context) {
    throw Error('useMealContext must be inside a MealContextProvider');
  }

  return context;
};

export default useMealContext;
