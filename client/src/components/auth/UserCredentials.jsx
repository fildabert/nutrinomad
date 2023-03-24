import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const UserCredentials = ({ name, email, password, updateFields }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Typography className="text-2xl text-center">
        Create your account
      </Typography>
      <TextField
        required
        id="standard-required"
        label="Username"
        variant="outlined"
        className="mt-8 mb-4"
        type={'text'}
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />
      <TextField
        required
        id="standard-required"
        label="Email"
        variant="outlined"
        className="my-4"
        type={'email'}
        value={email}
        onChange={(e) => {
          updateFields({ email: e.target.value });
        }}
      />
      <FormControl variant="outlined" className="my-4">
        <InputLabel htmlFor="outlined-adornment-password" required>
          Password
        </InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
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
          label="Password"
        />
      </FormControl>
    </Box>
  );
};

export default UserCredentials;
