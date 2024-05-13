import React from 'react';
import { CircularProgress, Box } from '@mui/material';

// Loader component to show loading indicator
const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" m={2}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
