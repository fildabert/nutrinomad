import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';

const EditProfileForm = ({ userData, onCancel, onClose }) => {
  const [formState, setFormState] = useState(userData);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `/api/user/${userData._id}`,
        formState
      );

      console.log(response.data);
      setIsError(false);
      onCancel();
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.response.data.error);
    }
  };
  const handleAvatarUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = reader.result.replace(
          /^data:image\/(png|jpeg|jpg);base64,/,
          ''
        );

        const formData = new FormData();
        formData.append('avatar', base64String);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const response = await axios.post(
          `/api/user/avatar/${userData._id}`,
          formData,
          config
        );
        console.log(response.data);
        setFormState((prevState) => ({
          ...prevState,
          avatar: base64String,
        }));
      };
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Dialog open={Boolean(userData)} onClose={onClose}>
      <Box className="flex flex-col justify-center items-center m-10">
        <Typography variant="h5" className="text-center m-4">
          Modify Your Profile Details
        </Typography>
        {isError && <Alert severity="error">{errorMessage}</Alert>}
        <Container className="flex justify-center items-center">
          <Box>
            <Avatar
              src={
                formState.avatar && `data:image/jpeg;base64,${formState.avatar}`
              }
              className="w-32 h-32 cursor-pointer"
              onClick={() => document.getElementById('avatar-input').click()}
            >
              <AddAPhotoIcon />
            </Avatar>
            <input
              type="file"
              id="avatar-input"
              accept=".jpeg, .png, .jpg"
              className="hidden"
              name="avatar"
              onChange={handleAvatarUpload}
            />
          </Box>
          <Box className="flex flex-col m-10 space-y-4">
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </Box>
        </Container>

        <Container className="flex flex-col justify-center">
          <Box className="flex justify-between">
            <Box className="space-y-4">
              <FormControl variant="outlined">
                <Typography variant="body2">Sex</Typography>
                <RadioGroup
                  row
                  value={formState.sex}
                  onChange={handleChange}
                  name="sex"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className="w-4/5">
                <InputLabel>Height</InputLabel>
                <OutlinedInput
                  type="number"
                  label="Height"
                  name="height"
                  endAdornment={
                    <InputAdornment position="end">cm</InputAdornment>
                  }
                  value={formState.height}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl variant="outlined" className="w-4/5">
                <InputLabel>Activity Level</InputLabel>
                <Select
                  value={formState.activityLevel}
                  label="Activity Level"
                  name="activityLevel"
                  onChange={handleChange}
                >
                  <MenuItem value="sedentary">Sedentary</MenuItem>
                  <MenuItem value="lightly_active">Lightly Active</MenuItem>
                  <MenuItem value="moderately_active">
                    Moderately Active
                  </MenuItem>
                  <MenuItem value="very_active">Very Active</MenuItem>
                  <MenuItem value="intensely_active">Intensely Active</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className="pt-1 space-y-4">
              <TextField
                label="Age"
                name="age"
                variant="outlined"
                type="number"
                value={formState.age}
                className="w-4/5"
                onChange={handleChange}
              />
              <FormControl className="w-4/5">
                <InputLabel>Weight</InputLabel>
                <OutlinedInput
                  type="number"
                  label="Weight"
                  name="weight"
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                  value={formState.weight}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl variant="outlined" className="w-4/5">
                <InputLabel>Goal</InputLabel>
                <Select
                  value={formState.goal}
                  label="Goal"
                  name="goal"
                  onChange={handleChange}
                >
                  <MenuItem value="maintain">Maintain Weight</MenuItem>
                  <MenuItem value="lose">Lose Weight</MenuItem>
                  <MenuItem value="gain">Gain Weight</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Container>

        <Box className="mt-8">
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="ml-4"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EditProfileForm;
