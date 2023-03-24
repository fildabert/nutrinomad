import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import CarbsIcon from '../../assets/icons/carbs.png';
import FatIcon from '../../assets/icons/fat.png';
import ProteinIcon from '../../assets/icons/protein.png';

const FoodCard = ({ foodData, onClick, isLoading }) => {
  const {
    name,
    foodCategory,
    servingSize,
    calories,
    carbs,
    fat,
    protein,
    quantity,
  } = foodData;

  const cardContent = isLoading ? (
    <Skeleton height={40} width={300} />
  ) : (
    <>
      <Tooltip title={name}>
        <Typography
          variant="subtitle1"
          className="font-bold overflow-hidden text-ellipsis whitespace-nowrap w-44"
        >
          {name}
        </Typography>
      </Tooltip>
      <Tooltip title={foodCategory}>
        <Typography
          variant="subtitle2"
          className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap w-32"
        >
          {foodCategory}
        </Typography>
      </Tooltip>
    </>
  );

  const nutrientContent = isLoading ? (
    <Skeleton height={50} width={300} />
  ) : (
    <Box className="flex justify-around flex-1">
      <Box className="flex items-center w-24">
        <Tooltip title="Carbohydrate">
          <img className="h-8 w-8 mr-2" src={CarbsIcon} alt="carbs" />
        </Tooltip>
        <Typography variant="subtitle2">{carbs} g</Typography>
      </Box>

      <Box className="flex items-center w-24">
        <Tooltip title="Fat">
          <img className="h-8 w-8 mr-2" src={FatIcon} alt="fat" />
        </Tooltip>
        <Typography variant="subtitle2">{fat} g</Typography>
      </Box>

      <Box className="flex items-center w-24">
        <Tooltip title="Protein">
          <img className="h-8 w-8 mr-2" src={ProteinIcon} alt="protein" />
        </Tooltip>
        <Typography variant="subtitle2">{protein} g</Typography>
      </Box>
    </Box>
  );

  const caloriesContent = isLoading ? (
    <Skeleton height={30} width={100} />
  ) : (
    <Box className="flex items-center">
      <Typography variant="h5" className="font-bold mr-1">
        {calories}
      </Typography>
      <Typography variant="subtitle1">kcal</Typography>
    </Box>
  );

  return (
    <Box className="flex flex-col my-1">
      <Card
        variant="elevation"
        className="flex items-center justify-between h-20 w-full p-4 hover:scale-105 transition-all duration-100 origin-center"
        onClick={onClick}
      >
        <Tooltip title="Quantity">
          <Typography className="font-bold">{quantity}</Typography>
        </Tooltip>
        <CardContent>{cardContent}</CardContent>

        <Tooltip title={servingSize}>
          <Typography className="text-sm text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap w-32 pr-2">
            {servingSize}
          </Typography>
        </Tooltip>

        {nutrientContent}

        <Tooltip title="Calories">
          <Box className="flex items-center">{caloriesContent}</Box>
        </Tooltip>
      </Card>
    </Box>
  );
};

export default FoodCard;
