import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

import { useAuthContext } from '../hooks/useAuthContext';
import useMealContext from '../hooks/useMealContext';
import { MEAL_ACTIONS } from '../context/MealContext';
import NutrientPieChart from './NutrientPieChart';

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography sx={{ color: 'GrayText' }}>
                {foodData.foodCategory}
              </Typography>
              <Box mt={2}>
                <TextField
                  sx={{ width: 1 / 4 }}
                  label="Quantity"
                  variant="standard"
                  type="number"
                  value={quantity}
                  inputProps={{ min: 1 }}
                  onChange={handleQuantityChange}
                />
              </Box>

              <Box mt={2}>
                <FormControl sx={{ width: 3 / 4 }}>
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

              <Box mt={2}>
                <Typography>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    Serving size:{' '}
                  </Typography>
                  {foodData.servingSize}
                </Typography>
                <Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 'bold', color: '#CC3366' }}
                  >
                    Protein:{' '}
                  </Typography>
                  {foodData.protein} g
                </Typography>
                <Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 'bold', color: '#FFE07D' }}
                  >
                    Fat:{' '}
                  </Typography>
                  {foodData.fat} g
                </Typography>
                <Typography>
                  <Typography
                    component="span"
                    sx={{ fontWeight: 'bold', color: '#99CC66' }}
                  >
                    Carbs:{' '}
                  </Typography>
                  {foodData.carbs} g
                </Typography>
                <Typography>
                  <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    Calories:{' '}
                  </Typography>
                  {foodData.calories} kcal
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <NutrientPieChart
                protein={foodData.protein}
                fat={foodData.protein}
                carbs={foodData.carbs}
              />
            </Box>
          </Grid>
        </Grid>
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
