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
  SUGAR: 2000,
  SODIUM: 1093,
  CALCIUM: 1087,
  IRON: 1089,
  VITAMIN_A: 1106,
  VITAMIN_B12: 1178,
  VITAMIN_C: 1162,
  VITAMIN_D: 1114,
  VITAMIN_E: 1109,
};
const DiaryEntryForm = ({
  food,
  onCancel,
  currentDate,
  currentMealType,
  onAddToDiary,
}) => {
  const [selectedServingSize, setSelectedServingSize] = useState(
    food.foodMeasures[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState(currentMealType);
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
    calories: getNutrientValue(NUTRIENT_ID.CALORIES, food) * quantity,
    carbs: getNutrientValue(NUTRIENT_ID.CARBS, food) * quantity,
    fat: getNutrientValue(NUTRIENT_ID.FAT, food) * quantity,
    protein: getNutrientValue(NUTRIENT_ID.PROTEIN, food) * quantity,
    sugar: getNutrientValue(NUTRIENT_ID.SUGAR, food) * quantity,
    sodium: getNutrientValue(NUTRIENT_ID.SODIUM, food) * quantity,
    calcium: getNutrientValue(NUTRIENT_ID.CALCIUM, food) * quantity,
    iron: getNutrientValue(NUTRIENT_ID.IRON, food) * quantity,
    vitaminA: getNutrientValue(NUTRIENT_ID.VITAMIN_A, food) * quantity,
    vitaminB12: getNutrientValue(NUTRIENT_ID.VITAMIN_B12, food) * quantity,
    vitaminC: getNutrientValue(NUTRIENT_ID.VITAMIN_C, food) * quantity,
    vitaminD: getNutrientValue(NUTRIENT_ID.VITAMIN_D, food) * quantity,
    vitaminE: getNutrientValue(NUTRIENT_ID.VITAMIN_E, food) * quantity,
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
    onAddToDiary();
    onCancel();
  };

  return (
    <Dialog open={Boolean(food)}>
      <DialogTitle>Add to Diary</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{food.description}</Typography>
        <Box className="flex justify-center mt-4">
          <FormControl className="w-1/4">
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

          <Typography className="p-4">servings of</Typography>

          <FormControl className="w-1/2">
            <InputLabel>Serving Size</InputLabel>
            <Select
              value={selectedServingSize}
              label="Serving Size"
              onChange={(e) => setSelectedServingSize(e.target.value)}
            >
              {food.foodMeasures.map((measure) => (
                <MenuItem key={measure.id} value={measure}>
                  {measure.disseminationText === 'Quantity not specified'
                    ? `${measure.gramWeight} grams`
                    : measure.disseminationText}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography className="text-center my-6">for</Typography>

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
