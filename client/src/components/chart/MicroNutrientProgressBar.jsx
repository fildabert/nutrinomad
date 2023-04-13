import { Alert, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { closeSnackbar, useSnackbar } from 'notistack';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const MicroNutrientProgressBar = ({ micronutrient, intake, total }) => {
  const { enqueueSnackbar } = useSnackbar();

  // Calculate the percentage of the total consumed micronutrient value
  const percentage = ((total / intake) * 100).toFixed(2);
  // Calculate the width of the progress bar based on the percentage
  const barWidth = `${percentage}%`;

  const secondaryBarWidth = `${Math.min(percentage - 100, 100)}%`;

  //Warning messages and risks for each micronutrient
  const getWarningMessage = (micronutrient) => {
    let warningMessage = `You've exceeded your daily ${micronutrient} intake.`;
    let risks = '';

    switch (micronutrient) {
      case 'iron':
        risks =
          'Excess iron intake may lead to iron toxicity, which can damage the liver and other organs.';
        break;
      case 'calcium':
        risks =
          'Too much calcium can increase the risk of kidney stones and may interfere with the absorption of other minerals.';
        break;
      case 'vitaminA':
        risks =
          'Excessive vitamin A intake can cause nausea, dizziness, and may lead to liver damage.';
        break;
      case 'vitaminB12':
        risks =
          'Excessive vitamin B12 intake is unlikely to cause harm, but may interfere with the absorption of other vitamins.';
        break;
      case 'vitaminC':
        risks =
          'Large doses of vitamin C may cause diarrhea, nausea, and other digestive problems.';
        break;
      case 'vitaminD':
        risks =
          'Too much vitamin D can lead to calcium buildup in the blood, which may cause confusion, vomiting, and kidney problems.';
        break;
      case 'vitaminE':
        risks =
          'Excessive vitamin E intake may increase the risk of bleeding and may interfere with blood clotting.';
        break;
      case 'sugar':
        risks =
          'Consuming too much sugar may lead to diabetes, obesity, and other health problems.';
        break;
      case 'sodium':
        risks =
          'Consuming too much sodium can increase blood pressure and may contribute to heart disease and stroke.';
        break;
      default:
        break;
    }

    return { warningMessage, risks };
  };

  const { warningMessage, risks } = getWarningMessage(micronutrient);

  const snackBarCloseButton = (key) => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    if (percentage > 100) {
      enqueueSnackbar(warningMessage, {
        variant: 'warning',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        autoHideDuration: null, // disable auto hide
        content: (key, message) => (
          <Alert severity="warning">
            <Box className="flex items-center">
              <Box>
                <Typography variant="body2">{message}</Typography>
                <Typography variant="caption">{risks}</Typography>
              </Box>
              <Box>{snackBarCloseButton(key)}</Box>
            </Box>
          </Alert>
        ),
      });
    }
  }, [percentage]);

  return (
    <Box className="m-2">
      <Tooltip title={`${total} / ${intake}`} arrow>
        <Box>
          <Typography className="text-sm font-medium text-gray-500">
            {`${micronutrient.charAt(0).toUpperCase()}${micronutrient.slice(
              1
            )}`}
          </Typography>
          <Box className="h-3 w-full bg-gray-300 rounded-full overflow-hidden">
            {percentage > 100 ? (
              <Box className="h-full bg-bright-green relative">
                <Box
                  className="h-full bg-bright-green absolute top-0 left-0"
                  style={{ width: '100%' }}
                ></Box>
                <Box
                  className="h-full bg-red-700 absolute top-0 left-0"
                  style={{ width: secondaryBarWidth }}
                ></Box>
              </Box>
            ) : (
              <Box
                className="h-full bg-bright-green"
                style={{ width: barWidth }}
              ></Box>
            )}
          </Box>
        </Box>
      </Tooltip>
      <Box className="font-medium mt-1 text-right">
        <Typography variant="caption">{`${percentage}%`}</Typography>
      </Box>
    </Box>
  );
};

export default MicroNutrientProgressBar;
