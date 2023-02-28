import { Alert, Box, Button, Container, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import ActivityLevel from '../components/ActivityLevel';
import BodyMetrics from '../components/BodyMetrics';
import Navbar from '../components/Navbar';
import PaperForm from '../components/PaperForm';
import SignUp from '../components/SignUp';
import UserGoal from '../components/UserGoal';
import axios from 'axios';

import { useMultiPageForm } from '../hooks/useMultiPageForm';
import { useSignUp } from '../hooks/useSignUp';
import SignUpSuccess from './SignUpSuccess';

const INITIAL_DATA = {
  name: '',
  email: '',
  password: '',
  sex: 'male',
  age: 12,
  height: 0,
  weight: 0,
  goal: '',
  activityLevel: 'sedentary',
};

const Form = () => {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [bmr, setBmr] = useState(0);
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
    <SignUp {...formData} updateFields={updateFields} />,
    <SignUpSuccess goal={formData.goal} bmr={bmr} />,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSecondLastPage) return nextPage();
    //call signup()
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
      const response = await axios.get(`/api/users/bmr/${user?.email}`);
      const userBmr = await response.data;
      setBmr(userBmr);
      nextPage();
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
            href={isLastPage ? '/home' : ''}
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

export default Form;
