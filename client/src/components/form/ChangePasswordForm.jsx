import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordIcon from '@mui/icons-material/Password';
import KeyIcon from '@mui/icons-material/Key';
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ onCancel, userData, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(`/api/user/password/${userData._id}`, {
        currentPassword,
        newPassword,
      });

      console.log(response.data);

      onCancel();
    } catch (err) {
      setError(true);
      setErrorMessage(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  return (
    <Dialog open={Boolean(userData)} onClose={onClose}>
      <Container className="px-20">
        <Typography variant="h5" className="text-center m-4">
          Change Password
        </Typography>
        <Box className="flex flex-col items-center">
          {error && (
            <Alert severity="error" className="w-full">
              {errorMessage}
            </Alert>
          )}
          <Box className="flex items-center space-x-4">
            <Icon component={KeyIcon} />
            <FormControl variant="outlined" className="my-4">
              <InputLabel>Current Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
              />
            </FormControl>
          </Box>

          <Box className="flex items-center space-x-4">
            <Icon component={PasswordIcon} />
            <FormControl variant="outlined" className="my-4">
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
          </Box>
        </Box>

        <Box className="flex justify-end my-8">
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="ml-4"
          >
            Save
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
};

export default ChangePasswordForm;
