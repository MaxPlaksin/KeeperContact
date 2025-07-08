import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box, Toolbar } from '@mui/material';
import Sidebar from './components/Layout/Sidebar';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import { getUser } from './utils/auth';
import theme from './theme';
import ContactsPage from './pages/ContactsPage';
import UsersPage from './pages/UsersPage';

const drawerWidth = 220;

function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogin = (user) => setUser(user);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          {user && <Sidebar user={user} onLogout={handleLogout} />}
          <Box component="main" sx={{ flexGrow: 1, ml: user ? `${drawerWidth}px` : 0, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Navigate to={user ? '/contacts' : '/login'} replace />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contacts" element={
                <ProtectedRoute user={user}>
                  <ContactsPage user={user} />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute user={user && user.role === 'admin' ? user : null}>
                  <UsersPage user={user} />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
