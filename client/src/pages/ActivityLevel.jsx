import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import PaperForm from '../components/PaperForm';

const ActivityLevel = () => {
  const [activityLevel, setActivityLevel] = useState('');

  const handleActivityLevelChange = (event, newActivityLevel) => {
    if (newActivityLevel !== null) {
      setActivityLevel(newActivityLevel);
    }
  };

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
      <Container maxWidth="md">
        <Navbar />
      </Container>
      <PaperForm>
        <Typography className="text-2xl text-center">
          How active are you?
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={activityLevel}
          exclusive
          orientation="vertical"
          onChange={handleActivityLevelChange}
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
        <Button
          variant="contained"
          className="my-4 text-white"
          href="/create/sign-up"
        >
          Continue
        </Button>
      </PaperForm>
    </Box>
  );
};

export default ActivityLevel;
