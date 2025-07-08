import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import ContactPhotoUpload from './ContactPhotoUpload';

const ContactForm = ({ initialValues = {}, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    fio: initialValues.fio || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    photo: initialValues.photo || null,
  });
  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (file) => {
    setPhotoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, photoFile });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="ФИО"
          name="fio"
          value={form.fio}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Телефон"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <ContactPhotoUpload photoUrl={form.photo} onUpload={handlePhotoUpload} />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Сохранить
          </Button>
          {onCancel && (
            <Button variant="outlined" color="secondary" onClick={onCancel} disabled={loading}>
              Отмена
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactForm; 