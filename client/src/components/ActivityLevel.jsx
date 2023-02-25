import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

const ActivityLevel = ({ activityLevel, updateFields }) => {
  const activityLevelButtons = [
    {
      value: 'sedentary',
      label: 'Sedentary',
      description: 'Little to no exercise',
    },
    {
      value: 'lightly_active',
      label: 'Lightly Active',
      description: 'Light exercise 1-3 days a week',
    },
    {
      value: 'moderately_active',
      label: 'Moderately Active',
      description: 'Moderate exercise 3-5 days a week',
    },
    {
      value: 'very_active',
      label: 'Very Active',
      description: 'Hard exercise 6-7 days a week',
    },
    {
      value: 'intensely_active',
      label: 'Intensely Active',
      description:
        'very intense exercise, physical job or training twice per day',
    },
  ];

  return (
    <Box>
      <Typography className="text-2xl text-center">
        How active are you?
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={activityLevel}
        exclusive
        orientation="vertical"
        onChange={(e, selectedActivityLevel) =>
          updateFields({ activityLevel: selectedActivityLevel })
        }
        className="my-6"
      >
        {activityLevelButtons.map((button) => (
          <ToggleButton
            key={button.value}
            value={button.value}
            className="border-dashed border-gray-500 border-2"
          >
            <Box className="flex flex-col items-center">
              <Typography variant="button">{button.label}</Typography>
              <Typography variant="caption">{button.description}</Typography>
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default ActivityLevel;
