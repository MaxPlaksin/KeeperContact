import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import Notification from '../components/Layout/Notification';
import { getProfile } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Fade, Paper } from '@mui/material';

// Импортируем картинку для фона (поместите её в public/bg.jpg или аналогично)
// import bgImage from '../../public/bg.jpg'; // если через import, иначе используем url

const LoginPage = ({ onLogin }) => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setShow(true);
  }, []);

  const handleLogin = async (data) => {
    localStorage.setItem('token', data.access_token);
    try {
      const user = await getProfile(data.access_token);
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      navigate('/contacts');
    } catch (err) {
      setNotification({ open: true, message: 'Ошибка получения профиля', severity: 'error' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundImage: 'url("/bg.jpg")', // Положите картинку в public/bg.jpg
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        bgcolor: 'rgba(0,0,0,0.7)',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          variant="h1"
          fontWeight={900}
          sx={{
            mb: 5,
            letterSpacing: 2,
            textAlign: 'center',
            color: '#FFD600',
            textShadow: `0 2px 8px #000, 0 0 2px #fff, 2px 2px 0 #000, 0 0 16px #FFD600`,
            WebkitTextStroke: '2px #000',
            fontFamily: 'Roboto, Arial, sans-serif',
            userSelect: 'none',
            borderRadius: 2,
            px: 2,
            background: 'rgba(255,255,255,0.05)',
            boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
          }}
        >
          Алмазгеобур
        </Typography>
        <Fade in={show} timeout={700}>
          <Paper elevation={8} sx={{
            p: 4,
            width: '100%',
            bgcolor: 'rgba(255,255,255,0.92)',
            border: '2px solid #FFD600',
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
            backdropFilter: 'blur(2px)',
          }}>
            <LoginForm onLogin={handleLogin} />
          </Paper>
        </Fade>
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        />
      </Box>
    </Box>
  );
};

export default LoginPage; 