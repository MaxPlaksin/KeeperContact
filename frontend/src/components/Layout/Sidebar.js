import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box, Divider } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 220;

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">{user?.username}</Typography>
        <Typography variant="caption" color="text.secondary">
          {user?.is_admin ? 'Администратор' : 'Пользователь'}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNav('/contacts')}>
          <ListItemIcon><ContactsIcon /></ListItemIcon>
          <ListItemText primary="Контакты" />
        </ListItem>
        {user?.is_admin && (
          <ListItem button onClick={() => handleNav('/users')}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItem>
        )}
        <ListItem button onClick={onLogout} sx={{ mt: 2 }}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar; 