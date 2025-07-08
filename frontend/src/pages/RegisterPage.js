import React, { useState } from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import Notification from '../components/Layout/Notification';

const RegisterPage = ({ onRegister }) => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const handleRegister = (data) => {
    setNotification({ open: true, message: 'Регистрация успешна! Теперь войдите.', severity: 'success' });
    onRegister && onRegister(data);
  };

  return (
    <>
      <RegisterForm onRegister={handleRegister} />
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </>
  );
};

export default RegisterPage; 