import { Box, Tooltip, Typography } from '@mui/material';
import CarbsIcon from '../../assets/icons/carbs.png';
import FatIcon from '../../assets/icons/fat.png';
import ProteinIcon from '../../assets/icons/protein.png';

const SignUpSuccess = ({
  goal,
  bmr,
  proteinIntake,
  fatIntake,
  carbsIntake,
}) => {
  return (
    <Box className="text-center">
      <Typography className="text-3xl font-medium mb-10">
        You're Signed Up!
      </Typography>
      <Typography>To {goal} weight, you need to consume:</Typography>
      <Typography variant="h3" className="font-bold">
        {bmr}
      </Typography>
      <Typography className="mb-4">calories/day</Typography>
      <Typography>Daily macronutrient intakes</Typography>
      <Box className="flex justify-around flex-1 my-4">
        <Box className="flex items-center justify-center w-24">
          <Tooltip title="Carbohydrate">
            <img className="h-8 w-8 mr-2" src={CarbsIcon} alt="carbs" />
          </Tooltip>
          <Typography variant="subtitle2">{carbsIntake} g</Typography>
        </Box>

        <Box className="flex items-center justify-center w-24">
          <Tooltip title="Fat">
            <img className="h-8 w-8 mr-2" src={FatIcon} alt="fat" />
          </Tooltip>
          <Typography variant="subtitle2">{fatIntake} g</Typography>
        </Box>

        <Box className="flex items-center justify-center w-24">
          <Tooltip title="Protein">
            <img className="h-8 w-8 mr-2" src={ProteinIcon} alt="protein" />
          </Tooltip>
          <Typography variant="subtitle2">{proteinIntake} g</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpSuccess;
