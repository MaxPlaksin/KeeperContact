import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import ContactList from "./components/Contacts/ContactList";
import ContactForm from "./components/Contacts/ContactForm";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUser, logout } from './utils/auth';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogin = () => {
    setUser(getUser());
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<DashboardLayout user={user} onLogout={handleLogout} />}>
          <Route path="/contacts" element={<ContactList user={user} />} />
          <Route path="/add-card" element={<ContactForm user={user} />} />
          <Route path="/profile" element={<div>Профиль</div>} />
          <Route path="/search" element={<div>Поиск</div>} />
          <Route path="/birthdays" element={<div>Дни рождения</div>} />
          <Route path="/cars" element={<div>Мои авто</div>} />
          <Route path="/logout" element={<div>Выход</div>} />
          <Route path="*" element={<ContactList user={user} />} />
        </Route>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}
