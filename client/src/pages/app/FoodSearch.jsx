import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useFoodSearch from '../../hooks/useFoodSearch';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  List,
  Skeleton,
  Snackbar,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import FoodCard from '../../components/food-diary/FoodCard';
import questionMark from '../../assets/images/question-mark.png';
import DiaryEntryForm from '../../components/form/DiaryEntryForm';
import { useLocation } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useAuthContext } from '../../hooks/useAuthContext';

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

const FoodSearch = () => {
  const location = useLocation();
  const currentDate = location.state?.date;
  const mealType = location.state?.mealType;

  const [query, setQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedServingSize, setSelectedServingSize] = useState(
    selectedFood ? selectedFood.foodMeasures[0] : null
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [history, setHistory] = useState([]);

  const [searchFood, foods, error, isLoading] = useFoodSearch();

  const { user } = useAuthContext();

  let foodHistoryKey;

  if (user) {
    foodHistoryKey = `foodSearchHistory_${user._id}`;
  }

  useEffect(() => {
    // Load the history from local storage
    const storedHistory = localStorage.getItem(foodHistoryKey);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveHistoryToLocalStorage = (newHistory) => {
    // Save the updated history to local storage
    localStorage.setItem(foodHistoryKey, JSON.stringify(newHistory));
  };

  useEffect(() => {
    searchFood(query);
  }, [query]);

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

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleAddToDiary = (food) => {
    // Check if food already exists in history
    const index = history.findIndex((entry) => entry.fdcId === food.fdcId);
    if (index !== -1) {
      // If duplicate found, remove older entry and add new one to beginning of array
      const updatedHistory = [
        food,
        ...history.filter((entry) => entry.fdcId !== food.fdcId),
      ].slice(0, 5);
      setHistory(updatedHistory);
      saveHistoryToLocalStorage(updatedHistory);
    } else {
      // Add the food to the beginning of the history array
      const updatedHistory = [food, ...history].slice(0, 5);
      setHistory(updatedHistory);
      saveHistoryToLocalStorage(updatedHistory);
    }

    console.log(food);
    setSnackbarMessage(`${food.description} added to diary!`);
    setIsSnackbarOpen(true);
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
    return nutrients;
  };

  const renderFoodCards = () => {
    const indexOfLastFood = Math.min(
      (currentPage + 1) * rowsPerPage,
      foods.length
    );
    const indexOfFirstFood = currentPage * rowsPerPage;
    const currentFoods = foods.slice(indexOfFirstFood, indexOfLastFood);

    if (isLoading) {
      return (
        <>
          {[...Array(rowsPerPage)].map((_, index) => (
            <Card key={`skeleton-${index}`} className="h-20 w-7/12 p-2 mb-2">
              <CardContent>
                <Skeleton animation="wave" height={30} />
                <Skeleton animation="wave" height={20} width="50%" />
              </CardContent>
            </Card>
          ))}
        </>
      );
    }

    return (
      <>
        {/* Render the search results */}
        <Typography variant="h6">Search Results</Typography>
        <List>
          {currentFoods.map((food) => (
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
                sugar: getNutrientValue(NUTRIENT_ID.SUGAR, food),
                sodium: getNutrientValue(NUTRIENT_ID.SODIUM, food),
                calcium: getNutrientValue(NUTRIENT_ID.CALCIUM, food),
                iron: getNutrientValue(NUTRIENT_ID.IRON, food),
                vitaminA: getNutrientValue(NUTRIENT_ID.VITAMIN_A, food),
                vitaminB12: getNutrientValue(NUTRIENT_ID.VITAMIN_B12, food),
                vitaminC: getNutrientValue(NUTRIENT_ID.VITAMIN_C, food),
                vitaminD: getNutrientValue(NUTRIENT_ID.VITAMIN_D, food),
                vitaminE: getNutrientValue(NUTRIENT_ID.VITAMIN_E, food),
                quantity: 1,
              }}
              onClick={() => setSelectedFood(food)}
            />
          ))}
        </List>

        {/* Render the pagination */}
        <TablePagination
          count={foods.length}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, value) => setCurrentPage(value)}
          showFirstButton
          showLastButton
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={(event) => setRowsPerPage(event.target.value)}
          component="div"
        />
      </>
    );
  };

  const renderFoodHistory = () => {
    return (
      <Box className="mb-4">
        {/* Render the history of foods */}
        <Typography variant="h6" className="text-center ">
          History
        </Typography>
        <List>
          {history.map((food) => (
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
                sugar: getNutrientValue(NUTRIENT_ID.SUGAR, food),
                sodium: getNutrientValue(NUTRIENT_ID.SODIUM, food),
                calcium: getNutrientValue(NUTRIENT_ID.CALCIUM, food),
                iron: getNutrientValue(NUTRIENT_ID.IRON, food),
                vitaminA: getNutrientValue(NUTRIENT_ID.VITAMIN_A, food),
                vitaminB12: getNutrientValue(NUTRIENT_ID.VITAMIN_B12, food),
                vitaminC: getNutrientValue(NUTRIENT_ID.VITAMIN_C, food),
                vitaminD: getNutrientValue(NUTRIENT_ID.VITAMIN_D, food),
                vitaminE: getNutrientValue(NUTRIENT_ID.VITAMIN_E, food),
                quantity: 1,
              }}
              onClick={() => setSelectedFood(food)}
            />
          ))}
        </List>
      </Box>
    );
  };

  return (
    <AppLayout>
      <Box className="flex flex-col items-center">
        <TextField
          placeholder="Search for food"
          value={query}
          onInput={(event) => {
            setQuery(event.target.value);
          }}
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

        {history.length > 0 && renderFoodHistory()}

        {foods.length === 0 && !error && (
          <Box>
            <img
              src={questionMark}
              alt="Illustration"
              className="w-1/2 my-4 block mx-auto"
            ></img>
            <Typography className="text-gray-500 text-center">
              No foods match your search. Try something different!
            </Typography>
          </Box>
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
          currentMealType={mealType}
          onAddToDiary={() => handleAddToDiary(selectedFood)}
        />
      )}

      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000} // automatically hide the snackbar after 5 seconds
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};

export default FoodSearch;
