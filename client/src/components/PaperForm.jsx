import { Box, Paper } from '@mui/material';

const PaperForm = ({ children, onSubmit }) => {
  return (
    <Box className="flex justify-center items-center h-screen">
      <Paper
        component="form"
        elevation={3}
        className="w-1/4 h-auto bg-white py-5 px-16 flex flex-col rounded-lg"
        onSubmit={onSubmit}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default PaperForm;
