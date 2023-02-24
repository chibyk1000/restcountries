import { Box, CircularProgress } from '@mui/material';
import React from 'react'

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        alignItems: "center",
      }}
      data-testid="loader"
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader
