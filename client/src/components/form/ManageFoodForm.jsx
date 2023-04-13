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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import axios from 'axios';

import { useAuthContext } from '../../hooks/useAuthContext';
import useMealContext from '../../hooks/useMealContext';
import { MEAL_ACTIONS } from '../../context/MealContext';
import NutrientPieChart from '../chart/NutrientPieChart';

const ManageFoodForm = ({ foodData, meal, open, onClose, date }) => {
  const [quantity, setQuantity] = useState(foodData.quantity);
  const [mealType, setMealType] = useState(meal.mealType);
  const { user } = useAuthContext();
  const { meals, dispatch: mealDispatch } = useMealContext();

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/diary/${user._id}/${foodData._id}`
      );
      const deletedFoodId = response.data.food._id;
      mealDispatch({ type: MEAL_ACTIONS.DELETE_MEAL, payload: deletedFoodId });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `/api/diary/${user._id}/${foodData._id}`,
        {
          mealId: meal._id,
          quantity: quantity,
          mealType: mealType,
          date: date,
          foods: [foodData],
        }
      );
      // console.log(meal);
      // console.log(response.data);
      // console.log(meals);
      // mealDispatch({
      //   type: MEAL_ACTIONS.UPDATE_MEAL,
      //   payload: response.data,
      // });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{foodData.name}</DialogTitle>
      <DialogContent>
        <Box>
          <Typography className="text-gray-500">
            {foodData.foodCategory}
          </Typography>
          <Grid container spacing={2} className="my-4">
            <Grid item xs={6}>
              <Box className="flex flex-col space-y-4">
                <TextField
                  className="w-1/4"
                  label="Quantity"
                  variant="standard"
                  type="number"
                  value={quantity}
                  inputProps={{ min: 1 }}
                  onChange={handleQuantityChange}
                />
                <FormControl className="w-2/3">
                  <InputLabel>Meal Type</InputLabel>
                  <Select
                    label="Meal Type"
                    value={mealType}
                    onChange={handleMealTypeChange}
                  >
                    <MenuItem value="breakfast">Breakfast</MenuItem>
                    <MenuItem value="lunch">Lunch</MenuItem>
                    <MenuItem value="dinner">Dinner</MenuItem>
                    <MenuItem value="snack">Snack</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} className="pl-20">
              <NutrientPieChart
                protein={foodData.protein}
                fat={foodData.fat}
                carbs={foodData.carbs}
              />
            </Grid>
          </Grid>

          <Box className="space-y-3">
            <Divider />
            <Typography variant="h5" className="font-bold">
              {foodData.calories} kcal
            </Typography>

            <Typography>
              <Typography component="span" className="font-bold">
                Serving size:{' '}
              </Typography>
              {foodData.servingSize}
            </Typography>

            <Divider />

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
                    {foodData.protein} g
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
                    {foodData.fat} g
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
                    {foodData.carbs} g
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
                    {foodData.sugar} g
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Sodium:{' '}
                    </Typography>
                    {foodData.sodium} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Calcium:{' '}
                    </Typography>
                    {foodData.calcium} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Iron:{' '}
                    </Typography>
                    {foodData.iron} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin A:{' '}
                    </Typography>
                    {foodData.vitaminA} μg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin B12:{' '}
                    </Typography>
                    {foodData.vitaminB12} μg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin C:{' '}
                    </Typography>
                    {foodData.vitaminC} mg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin D:{' '}
                    </Typography>
                    {foodData.vitaminD} μg
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Typography component="span" className="font-bold">
                      Vitamin E:{' '}
                    </Typography>
                    {foodData.vitaminE} mg
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleDelete}
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
        >
          Delete
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ManageFoodForm;
