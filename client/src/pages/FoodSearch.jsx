import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useFoodSearch from '../hooks/useFoodSearch';
import {
  Box,
  Container,
  InputAdornment,
  List,
  TextField,
  Typography,
} from '@mui/material';
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import DiaryEntryForm from '../components/DiaryEntryForm';
import { useLocation } from 'react-router-dom';

const NUTRIENT_ID = {
  PROTEIN: 1003,
  FAT: 1004,
  CARBS: 1005,
  CALORIES: 1008,
};

const FoodSearch = () => {
  const location = useLocation();
  const currentDate = location.state?.date;

  const [query, setQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedServingSize, setSelectedServingSize] = useState(
    selectedFood ? selectedFood.foodMeasures[0] : null
  );
  const [searchFood, foods, error] = useFoodSearch();

  const handleSearch = () => {
    searchFood(query);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleServingSizeSelect = (servingSize) => {
    setSelectedServingSize(servingSize);
  };

  // Returns a measurement in grams if text is not specified.
  const getFoodMeasurement = (food) => {
    const measure = food.foodMeasures[0];
    if (!measure) return '';

    if (measure.disseminationText !== 'Quantity not specified') {
      return measure.disseminationText;
    }

    return `${measure.gramWeight} grams`;
  };

  // Returns a nutrient based on it's id.
  const getNutrientValue = (nutrientId, food) => {
    const nutrient = food.foodNutrients.find(
      (n) => n.nutrientId === nutrientId
    );
    if (!nutrient) {
      return '0';
    }

    // Returns the adjusted nutrient value based on the gram weight of the serving size

    const measure = food.foodMeasures[0];
    const gramWeight = measure?.gramWeight || 100; // set default gramWeight to 100 if it doesn't exist
    const nutrientsPer100g = nutrient.value;
    let nutrients = (nutrientsPer100g / 100) * gramWeight;

    // If the nutrient is calories, round to the nearest number
    if (nutrientId === NUTRIENT_ID.CALORIES) {
      nutrients = Math.round(nutrients);
    } else {
      nutrients = nutrients.toFixed(2);
    }
    console.log(nutrients);
    return nutrients;
  };

  const renderFoodCards = () => {
    return (
      <List>
        {foods.map((food) => (
          <FoodCard
            key={food.fdcId}
            foodData={{
              name: food.description,
              foodCategory: food.foodCategory,
              servingSize: getFoodMeasurement(food),
              calories: getNutrientValue(NUTRIENT_ID.CALORIES, food),
              carbs: getNutrientValue(NUTRIENT_ID.CARBS, food),
              fat: getNutrientValue(NUTRIENT_ID.FAT, food),
              protein: getNutrientValue(NUTRIENT_ID.PROTEIN, food),
              quantity: 1,
            }}
            onClick={() => setSelectedFood(food)}
          />
        ))}
      </List>
    );
  };

  return (
    <>
      <Container maxWidth="md">
        <Navbar />
      </Container>
      <Box className="flex flex-col items-center">
        <TextField
          placeholder="Search for food"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="w-5/12"
        />
      </Box>
      <Box className="mt-5 flex flex-col items-center">
        {error && <Typography color="error">{error}</Typography>}
        {foods.length === 0 && !error && (
          <Typography className="text-gray-500">No results found.</Typography>
        )}
        {foods.length > 0 && renderFoodCards()}
      </Box>

      {selectedFood && (
        <DiaryEntryForm
          food={selectedFood}
          selectedServingSize={selectedServingSize}
          setSelectedServingSize={handleServingSizeSelect}
          onCancel={() => setSelectedFood(null)}
          currentDate={currentDate}
        />
      )}
    </>
  );
};

export default FoodSearch;
