import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import Notification from '../components/Layout/Notification';
import { getProfile } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Fade, Paper } from '@mui/material';

const gifBackgrounds = [
  '/slider/20250708_1719_Mountain Drilling Adventure_simple_compose_01jzn6fxyqfjtsjv67nh5nzmfx.gif',
  '/slider/20250708_1719_Mountain Drilling Adventure_simple_compose_01jzn6fxytfz998djw7ayzpdp2.gif',
  '/slider/20250708_1745_Drilling Rig Journey_simple_compose_01jzn80236erra0jt6ks3cfpt9.gif',
  '/slider/20250708_1745_Drilling Rig Journey_simple_compose_01jzn8022zf70byma587xr2e2q.gif',
];

const LoginPage = ({ onLogin }) => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [show, setShow] = useState(false);
  const [bgIdx, setBgIdx] = useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    setShow(true);
    const interval = setInterval(() => {
      setBgIdx((prev) => (prev + 1) % gifBackgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
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
        background: '#19253d',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Фоновые гифки */}
      {gifBackgrounds.map((gif, idx) => (
        <Box
          key={gif}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            opacity: bgIdx === idx ? 1 : 0,
            transition: 'opacity 1s',
            backgroundImage: `linear-gradient(120deg, #19253dCC 0%, #19253d99 100%), url('${gif}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
      <Box sx={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 400 }}>
        <Fade in={show} timeout={700}>
          <Paper elevation={8} sx={{
            p: 4,
            width: '100%',
            bgcolor: '#fff',
            border: '2px solid #ffc700',
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(25,37,61,0.10)',
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