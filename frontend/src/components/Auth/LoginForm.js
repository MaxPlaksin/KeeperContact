import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { login } from '../../api/auth';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await login(username, password);
      onLogin(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
      <Typography variant="h5" mb={2}>Вход</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Логин"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        required
        margin="normal"
        InputProps={{
          style: {
            fontSize: '1.25rem',
            color: '#19253d',
            fontWeight: 600,
            background: '#f5f5f5',
            padding: '14px 16px',
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: '1.1rem',
            color: '#19253d',
            fontWeight: 700,
          },
        }}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
        InputProps={{
          style: {
            fontSize: '1.25rem',
            color: '#19253d',
            fontWeight: 600,
            background: '#f5f5f5',
            padding: '14px 16px',
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: '1.1rem',
            color: '#19253d',
            fontWeight: 700,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 3, fontSize: '1.15rem', fontWeight: 700, py: 1.5, borderRadius: 2 }}
      >
        Войти
      </Button>
    </Box>
  );
};

export default LoginForm; 