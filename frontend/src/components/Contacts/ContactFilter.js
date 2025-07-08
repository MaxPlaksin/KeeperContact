import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';

const ContactFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({ fio: '', email: '', phone: '' });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({ fio: '', email: '', phone: '' });
    onFilter({ fio: '', email: '', phone: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          label="ФИО"
          name="fio"
          value={filters.fio}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label="Email"
          name="email"
          value={filters.email}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label="Телефон"
          name="phone"
          value={filters.phone}
          onChange={handleChange}
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">Поиск</Button>
        <Button onClick={handleReset} variant="outlined" color="secondary">Сбросить</Button>
      </Stack>
    </Box>
  );
};

export default ContactFilter; 