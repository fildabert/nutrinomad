import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

const UserGoal = ({ goal, updateFields }) => {
  const goalButtons = [
    {
      value: 'maintain',
      label: 'Maintain Weight',
    },
    {
      value: 'lose',
      label: 'Lose Weight',
    },
    {
      value: 'gain',
      label: 'Gain Weight',
    },
  ];

  return (
    <Box>
      <Typography className="text-2xl text-center">
        What is your current goal?
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={goal}
        exclusive
        orientation="vertical"
        onChange={(e, selectedGoal) => updateFields({ goal: selectedGoal })}
        className="my-6 w-full"
      >
        {goalButtons.map((button) => (
          <ToggleButton
            key={button.value}
            value={button.value}
            className="border-gray-700 border-4 my-2 rounded-lg border-double"
          >
            <Box className="flex flex-col items-center">
              <Typography variant="button">{button.label}</Typography>
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default UserGoal;
