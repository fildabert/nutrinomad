import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Navbar from '../components/Navbar';
import PaperForm from '../components/PaperForm';

const SignUp = () => {
  return (
    <Box>
      <Container maxWidth="md">
        <Navbar />
      </Container>
      <PaperForm>
        <Typography className="text-2xl text-center">
          Tell us about yourself
        </Typography>
        <FormControl className="my-4">
          <FormLabel>What is your biological sex?</FormLabel>
          <RadioGroup row name="radio-buttons-group">
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

        <FormControl className="my-4">
          <FormLabel>How old are you?</FormLabel>
          <Input
            required
            type="number"
            inputProps={{ min: 10, max: 100 }}
            className="w-1/2"
          ></Input>
        </FormControl>

        <FormControl className="my-4">
          <FormLabel>How tall are you?</FormLabel>
          <Input
            required
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            className="w-1/2"
          />
        </FormControl>

        <FormControl className="my-4">
          <FormLabel>How much do you weigh?</FormLabel>
          <Input
            required
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            className="w-1/2"
          />
        </FormControl>

        <Button
          variant="contained"
          className="my-4 text-white"
          href="/create/activity-level"
        >
          Continue
        </Button>
      </PaperForm>
    </Box>
  );
};

export default SignUp;
