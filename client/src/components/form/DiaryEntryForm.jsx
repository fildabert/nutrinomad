import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
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
  VITAMINA: 1106,
  VITAMINB12: 1178,
  VITAMINC: 1162,
  VITAMIND: 1114,
  VITAMINE: 1109,
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
  const [showNutrients, setShowNutrients] = useState(false);
  const [customMeasurement, setCustomMeasurement] = useState(false);
  const [customServingSize, setCustomServingSize] = useState('');
  const { user } = useContext(AuthContext);

  console.log(food);
  // Returns a nutrient based on it's id.
  const getNutrientValue = (nutrientId, food) => {
    const nutrient = food.foodNutrients.find(
      (n) => n.nutrientId === nutrientId
    );
    if (!nutrient) {
      return '0';
    }

    // Returns the adjusted nutrient value based on the gram weight of the serving size

    const gramWeight = customMeasurement
      ? customServingSize
      : selectedServingSize.gramWeight || 100; // set default gramWeight to 100 if it doesn't exist
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

    if (customMeasurement) {
      return `${customServingSize} grams`;
    }

    if (measure.disseminationText !== 'Quantity not specified') {
      return measure.disseminationText;
    }

    return `${measure.gramWeight} grams`;
  };

  const handleToggleNutrients = () => {
    setShowNutrients(!showNutrients);
  };

  const toggleCustomMeasurement = () => {
    setCustomMeasurement(!customMeasurement);
  };

  const nutrientKeys = [
    'carbs',
    'fat',
    'protein',
    'sugar',
    'sodium',
    'calcium',
    'iron',
    'vitaminA',
    'vitaminB12',
    'vitaminC',
    'vitaminD',
    'vitaminE',
  ];

  const selectedFood = {
    name: food.description,
    servingSize: getFoodMeasurement(food),
    calories: getNutrientValue(NUTRIENT_ID.CALORIES, food) * quantity,
    ...nutrientKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: (
          getNutrientValue(NUTRIENT_ID[key.toUpperCase()], food) * quantity
        ).toFixed(2),
      }),
      {}
    ),
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
        <Box className="flex justify-between">
          <Typography variant="h6">{`${food.description} - ${selectedFood.calories} kcal`}</Typography>
          <Button onClick={toggleCustomMeasurement}>
            Enter custom measurement
          </Button>
        </Box>

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

          {customMeasurement ? (
            <FormControl className="w-2/5">
              <InputLabel>Serving Size</InputLabel>
              <OutlinedInput
                value={customServingSize}
                type="number"
                inputProps={{ min: 1 }}
                endAdornment={
                  <InputAdornment position="end">grams</InputAdornment>
                }
                label="Serving Size"
                onChange={(e) => setCustomServingSize(e.target.value)}
              />
            </FormControl>
          ) : (
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
          )}
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
        <Box className="flex justify-center my-4">
          <Button onClick={handleToggleNutrients} variant="outlined">
            {showNutrients ? 'Hide' : 'Show'} Nutrient Information
          </Button>
        </Box>

        {showNutrients && (
          <Box className="space-y-3">
            <Box>
              <Typography
                variant="overline"
                component="p"
                className="text-center font-bold"
              >
                Macronutrients
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>
                    <Typography
                      component="span"
                      className="font-bold text-protein-red"
                    >
                      Protein:{' '}
                    </Typography>
                    {selectedFood.protein} g
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography
                      component="span"
                      className="font-bold text-fat-yellow"
                    >
                      Fat:{' '}
                    </Typography>
                    {selectedFood.fat} g
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography
                      component="span"
                      className="font-bold text-carbs-green"
                    >
                      Carbs:{' '}
                    </Typography>
                    {selectedFood.carbs} g
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box>
              <Typography
                variant="overline"
                component="p"
                className="text-center font-bold"
              >
                Micronutrients
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Sugar:{' '}
                    </Typography>
                    {selectedFood.sugar} g
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Sodium:{' '}
                    </Typography>
                    {selectedFood.sodium} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Calcium:{' '}
                    </Typography>
                    {selectedFood.calcium} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Iron:{' '}
                    </Typography>
                    {selectedFood.iron} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin A:{' '}
                    </Typography>
                    {selectedFood.vitaminA} μg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin B12:{' '}
                    </Typography>
                    {selectedFood.vitaminB12} μg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin C:{' '}
                    </Typography>
                    {selectedFood.vitaminC} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin D:{' '}
                    </Typography>
                    {selectedFood.vitaminD} μg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin E:{' '}
                    </Typography>
                    {selectedFood.vitaminE} mg
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DiaryEntryForm;
