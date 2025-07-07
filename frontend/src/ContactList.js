import React, { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { getPhotoUrl } from './api';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, IconButton, Typography, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ContactList({ contacts, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('fio');
  const [sortDir, setSortDir] = useState('asc');
  const [filterCity, setFilterCity] = useState('');

  const filtered = useMemo(() => {
    let res = contacts;
    if (search) {
      const s = search.toLowerCase();
      res = res.filter(c =>
        c.fio.toLowerCase().includes(s) ||
        (c.city && c.city.toLowerCase().includes(s)) ||
        (c.position && c.position.toLowerCase().includes(s))
      );
    }
    if (filterCity) {
      res = res.filter(c => c.city === filterCity);
    }
    res = [...res].sort((a, b) => {
      let v1 = a[sortField] || '';
      let v2 = b[sortField] || '';
      if (sortField === 'birthday') {
        v1 = v1 || '';
        v2 = v2 || '';
      }
      if (v1 < v2) return sortDir === 'asc' ? -1 : 1;
      if (v1 > v2) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return res;
  }, [contacts, search, sortField, sortDir, filterCity]);

  const uniqueCities = useMemo(() => Array.from(new Set(contacts.map(c => c.city).filter(Boolean))), [contacts]);

  return (
    <Box sx={{ maxWidth: '100%', p: 2 }}>
      <Typography variant="h5" mb={2}>Список контактов</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Поиск" value={search} onChange={e => setSearch(e.target.value)} />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Город</InputLabel>
          <Select value={filterCity} label="Город" onChange={e => setFilterCity(e.target.value)}>
            <MenuItem value="">Все города</MenuItem>
            {uniqueCities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Сортировка</InputLabel>
          <Select value={sortField} label="Сортировка" onChange={e => setSortField(e.target.value)}>
            <MenuItem value="fio">ФИО</MenuItem>
            <MenuItem value="city">Город</MenuItem>
            <MenuItem value="position">Должность</MenuItem>
            <MenuItem value="birthday">День рождения</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 80 }}>
          <InputLabel>Порядок</InputLabel>
          <Select value={sortDir} label="Порядок" onChange={e => setSortDir(e.target.value)}>
            <MenuItem value="asc">↑</MenuItem>
            <MenuItem value="desc">↓</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Город</TableCell>
              <TableCell>Должность</TableCell>
              <TableCell>День рождения</TableCell>
              <TableCell>Авто</TableCell>
              <TableCell>Телефоны</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Заметки</TableCell>
              <TableCell>Прочее</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.photo && <img src={getPhotoUrl(contact.photo)} alt="Фото" style={{ maxWidth: 60, maxHeight: 60 }} />}</TableCell>
                <TableCell>{contact.fio}</TableCell>
                <TableCell>{contact.city}</TableCell>
                <TableCell>{contact.position}</TableCell>
                <TableCell>{contact.birthday}</TableCell>
                <TableCell>{contact.car}</TableCell>
                <TableCell>{contact.phones && contact.phones.join(', ')}</TableCell>
                <TableCell>{contact.emails && contact.emails.join(', ')}</TableCell>
                <TableCell><span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(contact.notes)}} /></TableCell>
                <TableCell><span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.stringify(contact.other))}} /></TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(contact)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => onDelete(contact)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 