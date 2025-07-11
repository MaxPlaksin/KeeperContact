import React, { useEffect, useState } from 'react';
import { getContacts, createContact, updateContact, deleteContact, uploadPhoto } from '../api/contacts';
import { exportToCSV, exportToXLSX } from '../utils/export';
import { importFromCSV, importFromXLSX } from '../utils/import';
import { getToken, getUser } from '../utils/auth';
import ContactList from '../components/Contacts/ContactList';
import ContactForm from '../components/Contacts/ContactForm';
import { Dialog, DialogTitle, DialogContent, Paper, Typography, Box } from '@mui/material';

const ContactsPage = ({ user }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const token = getToken();
  const currentUser = user || getUser();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = { ...filter, sort_by: sortBy, sort_order: sortOrder };
      const data = await getContacts(token, params);
      setContacts(data);
      window.contactsForSidebar = data;
    } catch (err) {
      setNotification({ open: true, message: 'Ошибка загрузки контактов', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, [filter, sortBy, sortOrder]);

  const handleFilter = (values) => {
    setFilter(values);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = async (contact) => {
    if (!window.confirm('Удалить контакт?')) return;
    try {
      await deleteContact(token, contact.id);
      setNotification({ open: true, message: 'Контакт удалён', severity: 'success' });
      fetchContacts();
    } catch (err) {
      setNotification({ open: true, message: 'Ошибка удаления', severity: 'error' });
    }
  };

  const handleExport = (type) => {
    if (type === 'csv') exportToCSV(contacts);
    else exportToXLSX(contacts);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      let imported = [];
      if (file.name.endsWith('.csv')) imported = await importFromCSV(file);
      else if (file.name.endsWith('.xlsx')) imported = await importFromXLSX(file);
      // Можно реализовать массовое добавление через createContact
      setNotification({ open: true, message: `Импортировано: ${imported.length} контактов (только просмотр)`, severity: 'info' });
    } catch (err) {
      setNotification({ open: true, message: 'Ошибка импорта', severity: 'error' });
    }
  };

  const handleFormSubmit = async (form) => {
    try {
      let contact;
      if (editingContact) {
        contact = await updateContact(token, editingContact.id, form);
        if (form.photoFile) await uploadPhoto(token, editingContact.id, form.photoFile);
        setNotification({ open: true, message: 'Контакт обновлён', severity: 'success' });
      } else {
        contact = await createContact(token, form);
        if (form.photoFile) await uploadPhoto(token, contact.id, form.photoFile);
        setNotification({ open: true, message: 'Контакт создан', severity: 'success' });
      }
      setShowForm(false);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      setNotification({ open: true, message: 'Ошибка сохранения', severity: 'error' });
    }
  };

  const handleAdd = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  return (
    <div>
      {/* Личный кабинет */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Личный кабинет</Typography>
        <Box mt={1}>
          <Typography>Логин: <b>{currentUser?.username}</b></Typography>
          <Typography>Роль: <b>{currentUser?.is_admin ? 'Администратор' : 'Пользователь'}</b></Typography>
        </Box>
      </Paper>
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editingContact ? 'Редактировать контакт' : 'Добавить контакт'}</DialogTitle>
        <DialogContent>
          <ContactForm
            initialValues={editingContact}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
      <ContactList
        contacts={contacts}
        filterValues={filter}
        onFilter={handleFilter}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
        onImport={handleImport}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        notification={notification}
        onCloseNotification={() => setNotification({ ...notification, open: false })}
      />
      <button onClick={handleAdd} style={{ marginTop: 16 }}>Добавить контакт</button>
    </div>
  );
};

export default ContactsPage; 