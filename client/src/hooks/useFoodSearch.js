import { useState } from 'react';
import axios from 'axios';

const useFoodSearch = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  const searchFood = async (query) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_USDA_API_URL}/foods/search?api_key=${process.env.REACT_APP_USDA_API_KEY}&query=${query}&dataType=Survey%20(FNDDS)`
      );
      console.log(response.data.foods);
      setFoods(response.data.foods);
    } catch (err) {
      setError(err.message);
    }
  };

  return [searchFood, foods, error];
};

export default useFoodSearch;
