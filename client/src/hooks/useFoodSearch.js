import { useState } from 'react';
import axios from 'axios';

const useFoodSearch = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchFood = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_USDA_API_URL}/foods/search?api_key=${process.env.REACT_APP_USDA_API_KEY}&query=${query}*&dataType=Survey%20(FNDDS)`
      );
      console.log(response.data.foods);
      setFoods(response.data.foods);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return [searchFood, foods, error, isLoading];
};

export default useFoodSearch;
