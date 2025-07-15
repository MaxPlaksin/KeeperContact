import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          KeeperContact
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/contacts">Контакты</Button>
            {user.is_admin === true && (
              <Button color="inherit" component={Link} to="/users">Пользователи</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Выйти</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Вход</Button>
            <Button color="inherit" component={Link} to="/register">Регистрация</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 