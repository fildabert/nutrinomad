import { Box, Paper } from '@mui/material';

const PaperForm = ({ children, onSubmit }) => {
  return (
    <Box className="flex justify-center items-center min-h-screen m-auto max-w-4xl min-w-full">
      <Paper
        component="form"
        elevation={3}
        className="h-auto bg-white py-5 px-16 flex flex-col rounded-lg max-w-sm w-full"
        onSubmit={onSubmit}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default PaperForm;
