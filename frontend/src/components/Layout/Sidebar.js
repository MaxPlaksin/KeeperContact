import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box, Divider } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';

const drawerWidth = 220;

const Sidebar = ({ user, onLogout, contacts = [] }) => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  // Получаем ближайшие дни рождения (до 5)
  const getUpcomingBirthdays = () => {
    const today = new Date();
    // Фильтруем и сортируем контакты с датой рождения
    const withBday = contacts.filter(c => c.birthday);
    const parsed = withBday.map(c => {
      const [year, month, day] = c.birthday.split('-').map(Number);
      let next = new Date(today.getFullYear(), month - 1, day);
      if (next < today) next.setFullYear(today.getFullYear() + 1);
      return { ...c, nextBday: next };
    });
    parsed.sort((a, b) => a.nextBday - b.nextBday);
    return parsed.slice(0, 5);
  };
  const upcoming = getUpcomingBirthdays();

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
      {/* Виджет ближайших дней рождений */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}><CakeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Скоро день рождения</Typography>
        <Box sx={{ fontSize: 14, color: 'text.secondary' }}>
          {upcoming.length === 0 && <div>Нет ближайших дней рождений</div>}
          {upcoming.map(c => (
            <div key={c.id}>{c.fio} — {c.birthday ? c.birthday.slice(5) : ''}</div>
          ))}
        </Box>
      </Box>
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