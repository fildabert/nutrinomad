import {
  Box,
  Button,
  Container,
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
import Navbar from '../components/Navbar';
import PaperForm from '../components/PaperForm';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Navbar />
      </Container>
      <PaperForm onSubmit={handleSubmit}>
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          label="Email"
          variant="outlined"
          className="my-4"
          type={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="contained" className="my-4 text-white" type="submit">
          Sign Up
        </Button>
      </PaperForm>
    </Box>
  );
};

export default SignUp;
