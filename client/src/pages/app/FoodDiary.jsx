import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import emptyPlate from '../../assets/images/empty-plate.png';
import { useEffect, useState } from 'react';
import DiaryDate from '../../components/food-diary/DiaryDate';
import FoodCard from '../../components/food-diary/FoodCard';
import { useNavigate } from 'react-router-dom';
import ManageFoodForm from '../../components/form/ManageFoodForm';
import useMealContext from '../../hooks/useMealContext';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { MEAL_ACTIONS } from '../../context/MealContext';
import CalorieCounter from '../../components/food-diary/CalorieCounter';
import NutrientRadialBarChart from '../../components/chart/NutrientRadialBarChart';
import AddIcon from '@mui/icons-material/Add';
import AppLayout from '../../components/layout/AppLayout';
import MicroNutrientTracker from '../../components/food-diary/MicroNutrientTracker';

const FoodDiary = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFood, setSelectedFood] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [bmr, setBmr] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);
  const [fatIntake, setFatIntake] = useState(0);
  const [carbsIntake, setCarbsIntake] = useState(0);
  const [minMicronutrientIntake, setMinMicronutrientIntake] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Get necessary data from context
  const { user } = useAuthContext();
  const { meals, dispatch: mealDispatch } = useMealContext();

  // Get the date string from the current date state
  const dateString = currentDate.toISOString().substring(0, 10);

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
  const fetchNutritionalInfo = async () => {
    if (!user) {
      return;
    }
    const response = await axios.get(`/api/user/bmr/${user.email}`);
    const data = await response.data;
    const userBmr = data.bmr;
    const protein = data.proteinIntake;
    const fat = data.fatIntake;
    const carbs = data.carbsIntake;
    const micronutrients = data.minMicronutrientIntake;
    setBmr(userBmr);
    setProteinIntake(protein);
    setFatIntake(fat);
    setCarbsIntake(carbs);
    setMinMicronutrientIntake(micronutrients);
  };

  useEffect(() => {
    //fetch data in parallel
    Promise.all([fetchMeals(dateString), fetchNutritionalInfo()]);
  }, [currentDate, user]);

  const calculateTotalMacro = (macro) => {
    let totalMacro = 0;
    if (meals) {
      meals.forEach((meal) => {
        meal.foods.forEach((food) => {
          totalMacro += food[macro];
        });
      });
    }
    return Math.round(totalMacro);
  };

  const calculateTotalMicro = (micro) => {
    let totalMicro = 0;
    if (meals) {
      meals.forEach((meal) => {
        meal.foods.forEach((food) => {
          if (food[micro]) {
            totalMicro += food[micro];
          }
        });
      });
    }
    return totalMicro.toFixed(2);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddFoodButton = (mealType) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    //Format date to YYYY-MM-DD
    const date = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    navigate('/food/search', { state: { date, mealType } });
  };

  const renderMealsByType = (mealType) => {
    const mealTypeMeals = meals.filter((meal) => meal.mealType === mealType);
    const foodsIsEmpty = mealTypeMeals.some((meal) => meal.foods.length === 0);

    if (isLoading) {
      return (
        <Box className="my-2 flex justify-center">
          <CircularProgress />
        </Box>
      );
    }
    if (mealTypeMeals.length === 0 || foodsIsEmpty) {
      return (
        <Box className="p-7 text-center">
          <Button
            variant="contained"
            onClick={() => handleAddFoodButton(mealType)}
            startIcon={<AddIcon />}
          >
            Add Food to {mealType}
          </Button>
        </Box>
      );
    }

    return (
      <>
        <Box className="mt-2 max-w-min mx-auto">
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
        <Box className="p-7 text-center">
          <Button
            variant="contained"
            onClick={() => handleAddFoodButton(mealType)}
            startIcon={<AddIcon />}
          >
            Add Food to {mealType}
          </Button>
        </Box>
      </>
    );
  };

  const MealCard = ({ mealType }) => {
    return (
      <Card className="bg-green-50 p-4 rounded-3xl w-full my-2">
        <Typography variant="h6" align="center">
          {/* Set uppercase to the first character */}
          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </Typography>
        {renderMealsByType(mealType)}
      </Card>
    );
  };

  const renderMeals = () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    if (!meals || meals.length === 0) {
      return (
        <>
          <Container className="flex flex-col items-center h-screen my-20">
            <img
              src={emptyPlate}
              alt="Illustration"
              className="w-1/6 my-4"
            ></img>
            <Typography variant="h5" className="my-4">
              Looks like you haven't eaten anything yet today
            </Typography>

            <Button
              variant="contained"
              className="my-4"
              onClick={() => handleAddFoodButton('breakfast')}
              startIcon={<AddIcon />}
            >
              Add Food
            </Button>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Box className="flex justify-center w-1/3 h-24 mx-auto">
            <NutrientRadialBarChart
              name="Carbs"
              value={calculateTotalMacro('carbs')}
              max={carbsIntake}
              fill="#99CC66"
            />
            <NutrientRadialBarChart
              name="Fat"
              value={calculateTotalMacro('fat')}
              max={fatIntake}
              fill="#FFE07D"
            />
            <NutrientRadialBarChart
              name="Protein"
              value={calculateTotalMacro('protein')}
              max={proteinIntake}
              fill="#CC3366"
            />
          </Box>
          <MicroNutrientTracker
            minMicronutrientIntake={minMicronutrientIntake}
            calculateTotalMicro={calculateTotalMicro}
          />

          <Container className="flex flex-col items-center my-4">
            {mealTypes.map((mealType, index) => (
              <MealCard key={index} mealType={mealType} />
            ))}
          </Container>
        </>
      );
    }
  };

  return (
    <AppLayout>
      <Box>
        <DiaryDate currentDate={currentDate} setCurrentDate={setCurrentDate} />

        <CalorieCounter
          bmr={bmr}
          totalCalories={calculateTotalMacro('calories')}
        />

        {renderMeals()}
      </Box>

      {selectedFood && (
        <ManageFoodForm
          open={isDialogOpen}
          onClose={handleDialogClose}
          foodData={selectedFood}
          meal={selectedMeal}
          date={dateString}
        />
      )}
    </AppLayout>
  );
};

export default FoodDiary;
