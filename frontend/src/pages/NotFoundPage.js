import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFoundPage = () => (
  <Box sx={{ mt: 8, textAlign: 'center' }}>
    <Typography variant="h3" color="error">404</Typography>
    <Typography variant="h5">Страница не найдена</Typography>
  </Box>
);

export default NotFoundPage; 