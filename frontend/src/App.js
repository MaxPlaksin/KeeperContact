import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import ContactList from "./components/Contacts/ContactList";
import ContactForm from "./components/Contacts/ContactForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/add-card" element={<ContactForm />} />
          <Route path="/profile" element={<div>Профиль</div>} />
          <Route path="/search" element={<div>Поиск</div>} />
          <Route path="/birthdays" element={<div>Дни рождения</div>} />
          <Route path="/cars" element={<div>Мои авто</div>} />
          <Route path="/logout" element={<div>Выход</div>} />
          <Route path="*" element={<ContactList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
