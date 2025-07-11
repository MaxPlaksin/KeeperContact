import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import ContactPhotoUpload from './ContactPhotoUpload';

const ContactForm = ({ initialValues = {}, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    fio: initialValues.fio || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    city: initialValues.city || '',
    birthday: initialValues.birthday || '', // новое поле
    photo: initialValues.photo || null,
    // extra: initialValues.extra || '',
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
        <TextField
          label="Город"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        <TextField
          label="Дата рождения"
          name="birthday"
          type="date"
          value={form.birthday}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <ContactPhotoUpload photoUrl={form.photo} onUpload={handlePhotoUpload} />
        {/* Здесь можно добавить дополнительные поля/виджеты для агрегатора информации */}
        <TextField
          label="Заметки"
          name="notes"
          value={form.notes || ''}
          onChange={handleChange}
          multiline
          minRows={2}
        />
        <TextField
          label="Теги (через запятую)"
          name="tags"
          value={form.tags || ''}
          onChange={handleChange}
          placeholder="например: друг, коллега, vip"
        />
        {/* Файлы и история — можно добавить позже */}
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