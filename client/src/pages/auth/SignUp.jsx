import { Alert, Box, Button, Container, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import ActivityLevel from '../../components/auth/ActivityLevel';
import BodyMetrics from '../../components/auth/BodyMetrics';
import Navbar from '../../components/layout/Navbar';
import PaperForm from '../../components/layout/PaperForm';
import UserGoal from '../../components/auth/UserGoal';
import UserCredentials from '../../components/auth/UserCredentials';
import axios from 'axios';

import { useMultiPageForm } from '../../hooks/useMultiPageForm';
import { useSignUp } from '../../hooks/useSignUp';
import SignUpSuccess from '../../components/auth/SignUpSuccess';

const INITIAL_DATA = {
  name: '',
  email: '',
  password: '',
  sex: 'male',
  age: 12,
  height: 0,
  weight: 0,
  goal: 'maintain',
  activityLevel: 'sedentary',
};

const SignUp = () => {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [bmr, setBmr] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);
  const [fatIntake, setFatIntake] = useState(0);
  const [carbsIntake, setCarbsIntake] = useState(0);

  const [signUp, isError, errorMessage] = useSignUp();

  const updateFields = (fields) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const {
    pages,
    currentPage,
    prevPage,
    nextPage,
    isFirstPage,
    isLastPage,
    isSecondLastPage,
  } = useMultiPageForm([
    <UserGoal {...formData} updateFields={updateFields} />,
    <BodyMetrics {...formData} updateFields={updateFields} />,
    <ActivityLevel {...formData} updateFields={updateFields} />,
    <UserCredentials {...formData} updateFields={updateFields} />,
    <SignUpSuccess
      goal={formData.goal}
      bmr={bmr}
      proteinIntake={proteinIntake}
      fatIntake={fatIntake}
      carbsIntake={carbsIntake}
    />,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSecondLastPage) return nextPage();

    try {
      const user = await signUp(
        formData.name,
        formData.email,
        formData.password,
        formData.sex,
        formData.age,
        formData.height,
        formData.weight,
        formData.goal,
        formData.activityLevel
      );
      if (user) {
        const response = await axios.get(`/api/user/bmr/${user?.email}`);
        const data = await response.data;
        const userBmr = data.bmr;
        const protein = data.proteinIntake;
        const fat = data.fatIntake;
        const carbs = data.carbsIntake;
        setBmr(userBmr);
        setProteinIntake(protein);
        setFatIntake(fat);
        setCarbsIntake(carbs);

        nextPage();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Navbar />
      </Container>
      <LinearProgress
        variant="determinate"
        value={((currentPage + 1) / (pages.length + 1)) * 100}
      />
      <PaperForm onSubmit={handleSubmit}>
        {pages[currentPage]}
        {isError && <Alert severity="error">{errorMessage}</Alert>}
        <Box className="flex justify-between">
          {!isFirstPage && !isLastPage && (
            <Button
              type="button"
              variant="contained"
              className="my-4 text-white"
              onClick={prevPage}
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            className={`my-4 text-white ${
              isFirstPage || isLastPage ? 'mx-auto w-full' : ''
            }`}
            href={isLastPage ? '/food/diary' : ''}
          >
            {isSecondLastPage
              ? 'Sign Up'
              : isLastPage
              ? 'Explore NutriNomad'
              : 'Continue'}
          </Button>
        </Box>
      </PaperForm>
    </Box>
  );
};

export default SignUp;
