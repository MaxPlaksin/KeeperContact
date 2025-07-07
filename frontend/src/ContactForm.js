import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

export default function ContactForm({ initial, onSave, loading }) {
  const [form, setForm] = useState({
    fio: '', city: '', position: '', birthday: '', car: '', phones: '', emails: '', notes: '', other: '', photo: null
  });

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        phones: initial.phones ? initial.phones.join(', ') : '',
        emails: initial.emails ? initial.emails.join(', ') : '',
        other: initial.other ? JSON.stringify(initial.other) : '',
        photo: null
      });
    }
  }, [initial]);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 2, bgcolor: '#fafafa', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" mb={2}>{initial ? 'Редактировать контакт' : 'Добавить контакт'}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}><TextField name="fio" label="ФИО" value={form.fio} onChange={handleChange} required fullWidth /></Grid>
        <Grid item xs={12}><TextField name="city" label="Город" value={form.city} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><TextField name="position" label="Должность" value={form.position} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><TextField name="birthday" label="День рождения" value={form.birthday} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><TextField name="car" label="Авто" value={form.car} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><TextField name="phones" label="Телефоны (через запятую)" value={form.phones} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><TextField name="emails" label="E-mail (через запятую)" value={form.emails} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><TextField name="notes" label="Заметки" value={form.notes} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><TextField name="other" label='Прочее (JSON: {"telegram":"@user"})' value={form.other} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12}><Button variant="contained" component="label" fullWidth>Загрузить фото<input name="photo" type="file" accept="image/*" hidden onChange={handleChange} /></Button></Grid>
        <Grid item xs={12}><Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>{loading ? 'Сохраняю...' : 'Сохранить'}</Button></Grid>
      </Grid>
    </Box>
  );
} 