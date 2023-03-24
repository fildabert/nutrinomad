import {
  Alert,
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
import Navbar from '../../components/layout/Navbar';
import PaperForm from '../../components/layout/PaperForm';
import { useSignIn } from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, isError, errorMessage] = useSignIn();

  let navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password, (response) => {
      navigate('/food/diary');
    });
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Navbar />
      </Container>
      <PaperForm onSubmit={handleSubmit}>
        <Typography className="text-2xl text-center">Sign in</Typography>
        {isError && <Alert severity="error">{errorMessage}</Alert>}
        <TextField
          required
          label="Email"
          variant="outlined"
          className="mt-8 mb-4"
          type={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isError ? true : false}
        />
        <FormControl variant="outlined" className="my-4">
          <InputLabel required error={isError ? true : false}>
            Password
          </InputLabel>
          <OutlinedInput
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={isError ? true : false}
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
          Sign In
        </Button>
      </PaperForm>
    </Box>
  );
};

export default SignIn;
