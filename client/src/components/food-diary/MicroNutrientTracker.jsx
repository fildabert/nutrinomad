import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import MicroNutrientProgressBar from '../chart/MicroNutrientProgressBar';

const MicroNutrientTracker = ({
  minMicronutrientIntake,
  calculateTotalMicro,
}) => {
  const [showProgressBars, setShowProgressBars] = useState(true);

  const handleToggleProgressBars = () => {
    setShowProgressBars(!showProgressBars);
  };

  return (
    <>
      <Box className="flex justify-center my-4">
        <Button onClick={handleToggleProgressBars} variant="outlined">
          {showProgressBars ? 'Hide' : 'Show'} Micronutrients
        </Button>
      </Box>
      <Grid container spacing={2} className="w-1/2 mx-auto">
        {Object.entries(minMicronutrientIntake).map(
          ([micronutrient, intake]) =>
            showProgressBars && (
              <Grid item xs={12} sm={6} md={4} key={micronutrient}>
                <MicroNutrientProgressBar
                  micronutrient={micronutrient}
                  intake={intake}
                  total={calculateTotalMicro(micronutrient)}
                />
              </Grid>
            )
        )}
      </Grid>
    </>
  );
};

export default MicroNutrientTracker;
