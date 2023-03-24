import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const NUTRIENT_ID = {
  PROTEIN: 1003,
  FAT: 1004,
  CARBS: 1005,
  CALORIES: 1008,
};

const DiaryEntryForm = ({ food, onCancel, currentDate }) => {
  const [selectedServingSize, setSelectedServingSize] = useState(
    food.foodMeasures[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState('breakfast');
  const { user } = useContext(AuthContext);

  // Returns a nutrient based on it's id.
  const getNutrientValue = (nutrientId, food) => {
    const nutrient = food.foodNutrients.find(
      (n) => n.nutrientId === nutrientId
    );
    if (!nutrient) {
      return '0';
    }

    // Returns the adjusted nutrient value based on the gram weight of the serving size

    const measure = selectedServingSize;
    const gramWeight = measure?.gramWeight || 100; // set default gramWeight to 100 if it doesn't exist
    const nutrientsPer100g = nutrient.value;
    let nutrients = (nutrientsPer100g / 100) * gramWeight;

    // If the nutrient is calories, round to the nearest number
    if (nutrientId === NUTRIENT_ID.CALORIES) {
      nutrients = Math.round(nutrients);
    } else {
      nutrients = nutrients.toFixed(2);
    }

    return nutrients;
  };

  const getFoodMeasurement = (food) => {
    const measure = selectedServingSize;
    if (!measure) return '';

    if (measure.disseminationText !== 'Quantity not specified') {
      return measure.disseminationText;
    }

    return `${measure.gramWeight} grams`;
  };

  const selectedFood = {
    name: food.description,
    servingSize: getFoodMeasurement(food),
    calories: getNutrientValue(NUTRIENT_ID.CALORIES, food),
    carbs: getNutrientValue(NUTRIENT_ID.CARBS, food),
    fat: getNutrientValue(NUTRIENT_ID.FAT, food),
    protein: getNutrientValue(NUTRIENT_ID.PROTEIN, food),
    quantity: quantity,
    foodCategory: food.foodCategory,
  };

  const handleAdd = async () => {
    const meal = {
      date: currentDate,
      mealType,
      foods: [selectedFood],
    };
    //add meal to diary
    await axios.post(`/api/diary/${user._id}`, meal);
    onCancel();
  };

  return (
    <Dialog open={Boolean(food)}>
      <DialogTitle>Add to Diary</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{food.description}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <FormControl sx={{ width: 1 / 4 }}>
            <InputLabel>Quantity</InputLabel>
            <OutlinedInput
              required
              type="number"
              label="Quantity"
              inputProps={{ min: 1 }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormControl>

          <Typography sx={{ p: 2 }}>servings of</Typography>

          <FormControl sx={{ width: 1 / 2 }}>
            <InputLabel>Serving Size</InputLabel>
            <Select
              value={selectedServingSize}
              label="Serving Size"
              onChange={(e) => setSelectedServingSize(e.target.value)}
            >
              {food.foodMeasures.map((measure) => (
                <MenuItem key={measure.sequence} value={measure}>
                  {measure.disseminationText === 'Quantity not specified'
                    ? `${measure.gramWeight} grams`
                    : measure.disseminationText}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography sx={{ textAlign: 'center', my: 3 }}>for</Typography>

        <FormControl fullWidth>
          <InputLabel>Meal Type</InputLabel>
          <Select
            label="Meal Type"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
            <MenuItem value="snack">Snack</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DiaryEntryForm;
