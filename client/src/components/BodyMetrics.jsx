import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

const BodyMetrics = ({ sex, age, height, weight, updateFields }) => {
  return (
    <Box>
      <Typography className="text-2xl text-center">
        Tell us about yourself
      </Typography>
      <FormControl className="my-4">
        <FormLabel>What is your biological sex?</FormLabel>
        <RadioGroup
          row
          name="radio-buttons-group"
          onChange={(e) => updateFields({ sex: e.target.value })}
          value={sex}
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

      <FormControl className="my-4">
        <FormLabel>How old are you?</FormLabel>
        <Input
          required
          type="number"
          inputProps={{ min: 12, max: 100 }}
          className="w-1/2"
          value={age}
          onChange={(e) => updateFields({ age: e.target.value })}
        ></Input>
      </FormControl>

      <FormControl className="my-4">
        <FormLabel>How tall are you?</FormLabel>
        <Input
          required
          id="standard-adornment-weight"
          endAdornment={<InputAdornment position="end">cm</InputAdornment>}
          className="w-1/2"
          value={height}
          onChange={(e) => updateFields({ height: e.target.value })}
        />
      </FormControl>

      <FormControl className="my-4">
        <FormLabel>How much do you weigh?</FormLabel>
        <Input
          required
          id="standard-adornment-weight"
          endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          className="w-1/2"
          value={weight}
          onChange={(e) => updateFields({ weight: e.target.value })}
        />
      </FormControl>
    </Box>
  );
};

export default BodyMetrics;
