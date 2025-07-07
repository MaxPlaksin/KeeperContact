import React, { useEffect, useState } from 'react';
import './App.css';
import {
  register,
  login,
  setAuthToken,
  getMe,
  getContacts,
  createContact,
  uploadPhoto,
  getPhotoUrl,
} from './api';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Card, CardContent, Avatar, Typography, Box, Button, TextField, Grid } from '@mui/material';

function Notification({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [message, onClose]);
  if (!message) return null;
  return <div style={{ position: 'fixed', top: 10, right: 10, background: '#eee', padding: 10, border: '1px solid #ccc', zIndex: 1000 }}>{message}</div>;
}

function AppRoutes({ user, setUser, token, setToken }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState('');
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  async function fetchContacts() {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (e) {
      setError('Ошибка загрузки контактов');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (token && user) fetchContacts();
  }, [token, user]);

  async function handleSaveContact(form, id) {
    setAdding(true);
    setError(null);
    try {
      const contactData = {
        ...form,
        phones: form.phones ? form.phones.split(',').map(s => s.trim()) : [],
        emails: form.emails ? form.emails.split(',').map(s => s.trim()) : [],
        other: form.other ? JSON.parse(form.other) : undefined,
      };
      delete contactData.photo;
      let saved;
      if (id) {
        saved = await fetch(`/contacts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(contactData) }).then(r => r.json());
        setNotif('Контакт обновлен');
      } else {
        saved = await createContact(contactData);
        setNotif('Контакт добавлен');
      }
      if (form.photo) {
        await uploadPhoto(saved.id, form.photo);
      }
      setEditing(null);
      fetchContacts();
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.detail || 'Ошибка сохранения контакта');
    }
    setAdding(false);
  }

  async function handleDelete(contact) {
    if (!window.confirm('Удалить контакт?')) return;
    try {
      await fetch(`/contacts/${contact.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setNotif('Контакт удален');
      fetchContacts();
    } catch (e) {
      setError('Ошибка удаления');
    }
  }

  return (
    <>
      <Notification message={notif} onClose={() => setNotif('')} />
      <nav>
        <Link to="/">Список</Link> | <Link to="/add">Добавить</Link> | <Link to="/profile">Профиль</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ContactList contacts={contacts} onEdit={c => { setEditing(c); navigate('/edit'); }} onDelete={handleDelete} />} />
        <Route path="/add" element={<ContactForm onSave={f => handleSaveContact(f)} loading={adding} />} />
        <Route path="/edit" element={editing ? <ContactForm initial={editing} onSave={f => handleSaveContact(f, editing.id)} loading={adding} /> : <div>Выберите контакт для редактирования</div>} />
        <Route path="/profile" element={<div><b>Пользователь:</b> {user.username} ({user.is_admin ? 'админ' : 'пользователь'})</div>} />
      </Routes>
      {error && <div style={{ color: 'red' }}>{DOMPurify.sanitize(error)}</div>}
    </>
  );
}

function AuthPage({ setUser, setToken }) {
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  async function handleAuth(e) {
    e.preventDefault();
    setError(null);
    try {
      if (authMode === 'register') {
        await register(authForm.username, authForm.password);
        setAuthMode('login');
      } else {
        const data = await login(authForm.username, authForm.password);
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        setAuthToken(data.access_token);
        const me = await getMe();
        setUser(me);
      }
    } catch (e) {
      setError(e.response?.data?.detail || 'Ошибка');
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 350, maxWidth: 400, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar src="/logo_agb.png" sx={{ width: 80, height: 80, mb: 2 }} />
            <Typography variant="h5" fontWeight={700} mb={1}>
              Алмазгеобур
            </Typography>
            <Typography variant="h6" fontWeight={500} mb={2}>
              {authMode === 'login' ? 'Вход в систему' : 'Регистрация'}
            </Typography>
          </Box>
          <form onSubmit={handleAuth}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Имя пользователя"
                  value={authForm.username}
                  onChange={e => setAuthForm(f => ({ ...f, username: e.target.value }))}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Пароль"
                  value={authForm.password}
                  onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} sx={{ mt: 2 }} fullWidth>
            {authMode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </Button>
          {error && <Typography color="error" align="center" mt={2}>{DOMPurify.sanitize(error)}</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      getMe().then(setUser).catch(() => logout());
    }
  }, [token]);

  function logout() {
    setUser(null);
    setToken('');
    setAuthToken(null);
    localStorage.removeItem('token');
  }

  if (!token || !user) {
    return <AuthPage setUser={setUser} setToken={setToken} />;
  }

  return (
    <Router>
      <div className="App">
        <button style={{ float: 'right' }} onClick={logout}>Выйти</button>
        <AppRoutes user={user} setUser={setUser} token={token} setToken={setToken} />
      </div>
    </Router>
  );
}

export default App;
