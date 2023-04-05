import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Icon,
  Paper,
  Typography,
} from '@mui/material';

import CarbsIcon from '../../assets/icons/carbs.png';
import FatIcon from '../../assets/icons/fat.png';
import ProteinIcon from '../../assets/icons/protein.png';
import EditIcon from '@mui/icons-material/Edit';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import HeightIcon from '@mui/icons-material/Height';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import KeyIcon from '@mui/icons-material/Key';

import { useAuthContext } from '../../hooks/useAuthContext';
import AppLayout from '../../components/layout/AppLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfileForm from '../../components/form/EditProfileForm';
import ChangePasswordForm from '../../components/form/ChangePasswordForm';
import useUserContext from '../../hooks/useUserContext';

const Profile = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const { userData, dispatch } = useUserContext();
  const { user } = useAuthContext();

  const fetchUser = async () => {
    if (!user) {
      return;
    }
    const response = await axios.get(`/api/user/${user._id}`);
    dispatch({ type: 'SET_USER_DATA', payload: response.data });
  };

  useEffect(() => {
    fetchUser();
  }, [isEditProfile]);

  const handleEditProfile = () => {
    setIsEditProfile(true);
  };

  const handleDialogClose = () => {
    setIsEditProfile(false);
    setIsChangePassword(false);
  };

  const handleChangePassword = () => {
    setIsChangePassword(true);
  };

  // const handleUpdateUser = (updatedUserData) => {
  //   setUserData(updatedUserData);
  // };

  return (
    <AppLayout>
      {userData && (
        <Paper className="m-auto max-w-4xl p-10 rounded-3xl">
          <Container className="flex">
            <Box className="w-2/5 flex flex-col items-center space-y-8 mr-16">
              <Avatar
                src={
                  userData.avatar && `data:image/jpeg;base64,${userData.avatar}`
                }
                alt="User Avatar"
                className="w-36 h-36 mt-14"
              >
                {userData.name.charAt(0)}
              </Avatar>

              <Button
                variant="contained"
                color="primary"
                onClick={handleEditProfile}
                startIcon={<EditIcon />}
                className="w-3/4"
              >
                Edit Profile
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
                startIcon={<KeyIcon />}
                className="w-3/4"
              >
                Change Password
              </Button>
            </Box>
            <Box className="w-full px-8">
              <Typography variant="h6" className="text-center font-bold py-4">
                <Icon component={PersonIcon} /> Personal Information
              </Typography>
              <Box className="flex justify-around mb-4">
                <Box>
                  <Box className="flex items-center">
                    <Icon component={BadgeIcon} className="mr-2 text-lg" />
                    <Typography variant="body1" className="font-bold">
                      Name
                    </Typography>
                  </Box>
                  <Typography variant="body1">{userData.name}</Typography>
                </Box>

                <Box>
                  <Box className="flex items-center">
                    <Icon component={EmailIcon} className="mr-2 text-lg" />
                    <Typography variant="body1" className="font-bold">
                      Email
                    </Typography>
                  </Box>
                  <Typography variant="body1">{userData.email}</Typography>
                </Box>

                <Box>
                  <Box className="flex items-center">
                    <Icon
                      component={SportsScoreIcon}
                      className="mr-2 text-lg"
                    />
                    <Typography variant="body1" className="font-bold">
                      Goal
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {' '}
                    {userData.goal.charAt(0).toUpperCase()}
                    {userData.goal.slice(1)} weight
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Typography variant="h6" className="text-center font-bold py-4">
                <Icon component={AccessibilityNewIcon} /> Physical Profile
              </Typography>

              <Box className="flex justify-around mb-4">
                <Box>
                  <Box className="flex items-center">
                    {userData.sex === 'male' ? (
                      <Icon component={MaleIcon} className="mr-1" />
                    ) : (
                      <Icon component={FemaleIcon} className="mr-1" />
                    )}
                    <Typography variant="body1" className="font-bold">
                      Sex
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {`${userData.sex
                      .charAt(0)
                      .toUpperCase()}${userData.sex.slice(1)}`}{' '}
                  </Typography>
                </Box>

                <Box>
                  <Box className="flex items-center">
                    <Icon component={EventIcon} className="mr-2 text-lg" />
                    <Typography variant="body1" className="font-bold">
                      Age
                    </Typography>
                  </Box>
                  <Typography variant="body1">{userData.age} years</Typography>
                </Box>

                <Box>
                  <Box className="flex items-center">
                    <Icon
                      component={DirectionsRunIcon}
                      className="mr-2 text-lg"
                    />
                    <Typography variant="body1" className="font-bold">
                      Activity Level
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {userData.activityLevel
                      .split('_')
                      .map(
                        (word) =>
                          `${word.charAt(0).toUpperCase()}${word.slice(1)}`
                      )
                      .join(' ')}{' '}
                  </Typography>
                </Box>
              </Box>

              <Box className="flex justify-around mb-4">
                <Box>
                  <Box className="flex items-center">
                    <Icon component={HeightIcon} className="mr-2 text-lg" />
                    <Typography variant="body1" className="font-bold">
                      Height
                    </Typography>
                  </Box>
                  <Typography variant="body1">{userData.height} cm</Typography>
                </Box>

                <Box>
                  <Box className="flex items-center">
                    <Icon
                      component={MonitorWeightIcon}
                      className="mr-2 text-lg"
                    />
                    <Typography variant="body1" className="font-bold">
                      Weight
                    </Typography>
                  </Box>
                  <Typography variant="body1">{userData.weight} kg</Typography>
                </Box>
              </Box>

              <Divider />

              <Typography variant="h6" className="text-center font-bold py-4">
                <Icon component={RestaurantMenuIcon} /> Nutrition Profile
              </Typography>

              <Box className="flex justify-center mb-4">
                <Box>
                  <Typography variant="body1" className="font-bold">
                    BMR (Calories per day)
                  </Typography>
                  <Typography variant="body1">{userData.bmr} kcal</Typography>
                </Box>
              </Box>

              <Typography
                variant="body1"
                className="font-bold text-center mb-4 mt-8"
              >
                Daily Macronutrients Intake
              </Typography>

              <Box className="flex justify-around mb-4">
                <Box className="flex items-center">
                  <img className="h-6 w-6 mr-1" src={CarbsIcon} alt="carbs" />
                  <Box>
                    <Typography variant="body1" className="font-bold">
                      Carbs Intake
                    </Typography>
                    <Typography variant="body1">
                      {userData.carbsIntake} g
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center">
                  <img className="h-6 w-6 mr-1" src={FatIcon} alt="fat" />
                  <Box>
                    <Typography variant="body1" className="font-bold">
                      Fat Intake
                    </Typography>
                    <Typography variant="body1">
                      {userData.fatIntake} g
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center">
                  <img
                    className="h-6 w-6 mr-1"
                    src={ProteinIcon}
                    alt="protein"
                  />
                  <Box>
                    <Typography variant="body1" className="font-bold">
                      Protein Intake
                    </Typography>
                    <Typography variant="body1">
                      {userData.proteinIntake} g
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Paper>
      )}

      {isEditProfile && (
        <EditProfileForm
          userData={userData}
          onCancel={handleDialogClose}
          onClose={() => setIsEditProfile(false)}
          // onUpdateUser={handleUpdateUser}
        />
      )}

      {isChangePassword && (
        <ChangePasswordForm
          onCancel={handleDialogClose}
          userData={userData}
          onClose={() => setIsChangePassword(false)}
        />
      )}
    </AppLayout>
  );
};
export default Profile;
