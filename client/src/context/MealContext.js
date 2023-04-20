import { createContext, useReducer } from 'react';

export const MealContext = createContext();

export const MEAL_ACTIONS = {
  SET_MEALS: 'set-meals',
  CREATE_MEAL: 'create-meal',
  DELETE_MEAL: 'delete-meal',
  UPDATE_MEAL: 'update-meal',
};

export const mealReducer = (state, action) => {
  switch (action.type) {
    case MEAL_ACTIONS.SET_MEALS:
      return { meals: action.payload };
    case MEAL_ACTIONS.CREATE_MEAL:
      return { meals: [action.payload, ...state.meals] };
    case MEAL_ACTIONS.DELETE_MEAL:
      const deletedFoodId = action.payload;
      const updatedMeals = state.meals
        .map((meal) => {
          // Check if the meal contains the deleted food
          const updatedFoods = meal.foods.filter(
            (food) => food._id !== deletedFoodId
          );
          // If the meal still has foods, return the updated meal
          if (updatedFoods.length > 0) {
            return { ...meal, foods: updatedFoods };
          }
          // Otherwise, remove the meal from the meals array
          return null;
        })
        .filter((meal) => meal !== null); // Remove null values from the array
      return { meals: updatedMeals };
    //TODO: needs fixing
    case MEAL_ACTIONS.UPDATE_MEAL:
      const { mealId, foodId, quantity, mealType } = action.payload;
      const updatedMeals2 = state.meals.map((meal) => {
        if (meal._id === mealId) {
          const updatedFoods = meal.foods.map((food) => {
            if (food._id === foodId) {
              const quantityRatio = quantity / food.quantity;
              const updatedNutrients = {};
              const nutrients = [
                'calories',
                'protein',
                'carbs',
                'fat',
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
              nutrients.forEach((nutrient) => {
                updatedNutrients[nutrient] = +(
                  food[nutrient] * quantityRatio
                ).toFixed(2);
              });
              return {
                ...food,
                ...updatedNutrients,
                quantity,
              };
            }
            return food;
          });
          const updatedMeal = { ...meal, foods: updatedFoods };
          const mealTypeChanged = updatedMeal.mealType !== mealType;
          return mealTypeChanged ? { ...updatedMeal, mealType } : updatedMeal;
        }
        return meal;
      });

      return { ...state, meals: updatedMeals2 };

    default:
      return state;
  }
};

export const MealContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealReducer, { meals: null });

  return (
    <MealContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MealContext.Provider>
  );
};
