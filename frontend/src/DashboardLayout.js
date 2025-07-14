import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";
import CakeIcon from "@mui/icons-material/Cake";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const menu = [
  { label: "Контакты", icon: <ContactsIcon />, path: "/contacts" },
  { label: "Добавить визитку", icon: <AddPhotoAlternateIcon />, path: "/add-card" },
  { label: "Поиск", icon: <SearchIcon />, path: "/search" },
  { label: "Дни рождения", icon: <CakeIcon />, path: "/birthdays" },
  { label: "Мои авто", icon: <DirectionsCarIcon />, path: "/cars" },
  { label: "Профиль", icon: <PersonIcon />, path: "/profile" },
  { label: "Выход", icon: <LogoutIcon />, path: "/logout" },
];

export default function DashboardLayout({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            bgcolor: "#232946",
            color: "#fff",
          },
        }}
      >
        <Toolbar sx={{ bgcolor: "#232946", color: "#fff" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            KeeperContact
          </Typography>
        </Toolbar>
        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => {
                if (item.path === "/logout") {
                  onLogout && onLogout();
                } else {
                  navigate(item.path);
                }
              }}
              sx={{
                borderRadius: "8px",
                mx: 1,
                my: 0.5,
                "&.Mui-selected, &:hover": {
                  bgcolor: "#395bda",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        {/* Можно добавить отображение пользователя */}
        <Box sx={{ p: 2, color: '#fff' }}>
          <Typography variant="subtitle1">{user?.username}</Typography>
          <Typography variant="caption" color="#ffc700">
            {user?.is_admin ? 'Администратор' : 'Пользователь'}
          </Typography>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Здесь рендерятся все вложенные роуты */}
        <Outlet />
      </Box>
    </Box>
  );
}
