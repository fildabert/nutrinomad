import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DiaryDate from '../components/DiaryDate';
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import { useNavigate } from 'react-router-dom';
import ManageFoodForm from '../components/ManageFoodForm';
import useMealContext from '../hooks/useMealContext';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { MEAL_ACTIONS } from '../context/MealContext';

const FoodDiary = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFood, setSelectedFood] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const { meals, dispatch: mealDispatch } = useMealContext();
  const dateString = currentDate.toISOString().substring(0, 10);

  useEffect(() => {
    const fetchMeals = async (dateString) => {
      if (!user) {
        return;
      }
      setIsLoading(true);
      const response = await axios.get(
        `/api/diary/${user._id}?date=${dateString}`
      );
      const data = response.data;
      console.log(data);
      mealDispatch({ type: MEAL_ACTIONS.SET_MEALS, payload: data });
      setIsLoading(false);
    };

    fetchMeals(dateString);
  }, [currentDate, user]);

  const renderMealsByType = (mealType) => {
    if (!meals) {
      return (
        <Box mt={2}>
          <Typography variant="subtitle1">No food yet</Typography>
        </Box>
      );
    }

    const mealTypeMeals = meals.filter((meal) => meal.mealType === mealType);
    const foodsIsEmpty = mealTypeMeals.some((meal) => meal.foods.length === 0);

    if (isLoading) {
      return (
        <Box mt={2}>
          <Typography variant="h1">
            <CircularProgress />
          </Typography>
        </Box>
      );
    }
    if (mealTypeMeals.length === 0 || foodsIsEmpty) {
      return (
        <Box mt={2}>
          <Typography variant="subtitle1">No food yet</Typography>
        </Box>
      );
    }

    return (
      <Box mt={2}>
        {mealTypeMeals.map((meal) => (
          <Box key={meal._id} className="my-2">
            {meal.foods.map((food) => (
              <FoodCard
                key={food._id}
                foodData={food}
                isLoading={isLoading}
                onClick={() => {
                  setSelectedFood(food);
                  setSelectedMeal(meal);
                  setIsDialogOpen(true);
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddFoodButton = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    //Format date to YYYY-MM-DD
    const date = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    navigate('/food/search', { state: { date } });
  };
  return (
    <>
      <Container maxWidth="md">
        <Navbar />
      </Container>
      <DiaryDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" onClick={handleAddFoodButton}>
          Add Food
        </Button>
      </Box>
      <Container className="flex flex-col items-center">
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Breakfast
          </Typography>
          {renderMealsByType('breakfast')}
        </Box>
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Lunch
          </Typography>
          {renderMealsByType('lunch')}
        </Box>
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Dinner
          </Typography>
          {renderMealsByType('dinner')}
        </Box>
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Snacks
          </Typography>
          {renderMealsByType('snack')}
        </Box>
      </Container>
      {selectedFood && (
        <ManageFoodForm
          open={isDialogOpen}
          onClose={handleDialogClose}
          foodData={selectedFood}
          meal={selectedMeal}
          date={dateString}
        />
      )}
    </>
  );
};

export default FoodDiary;
