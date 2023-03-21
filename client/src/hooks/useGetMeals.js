import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useGetMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchMeals = async (date) => {
    try {
      if (user) {
        const response = await axios.get(`/api/diary/${user._id}?date=${date}`);
        setMeals(response.data);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const getMeals = (date) => {
    setIsLoading(true);
    fetchMeals(date);
  };

  return [getMeals, meals, isLoading, error];
};

export default useGetMeals;
