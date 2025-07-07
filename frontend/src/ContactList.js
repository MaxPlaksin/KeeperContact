import React, { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { getPhotoUrl } from './api';

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
    <div>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={filterCity} onChange={e => setFilterCity(e.target.value)}>
          <option value="">Все города</option>
          {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="fio">ФИО</option>
          <option value="city">Город</option>
          <option value="position">Должность</option>
          <option value="birthday">День рождения</option>
        </select>
        <select value={sortDir} onChange={e => setSortDir(e.target.value)}>
          <option value="asc">↑</option>
          <option value="desc">↓</option>
        </select>
      </div>
      <ul>
        {filtered.map((contact) => (
          <li key={contact.id} style={{ marginBottom: 16 }}>
            <b>{contact.fio}</b>
            {contact.city && <> — {contact.city}</>}
            {contact.position && <> — {contact.position}</>}
            {contact.birthday && <> — {contact.birthday}</>}
            {contact.car && <> — {contact.car}</>}
            {contact.photo && (
              <div><img src={getPhotoUrl(contact.photo)} alt="Фото" style={{ maxWidth: 120, maxHeight: 120 }} /></div>
            )}
            {contact.notes && <div>Заметки: <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(contact.notes)}} /></div>}
            {contact.phones && contact.phones.length > 0 && <div>Телефоны: {contact.phones.join(', ')}</div>}
            {contact.emails && contact.emails.length > 0 && <div>Email: {contact.emails.join(', ')}</div>}
            {contact.other && <div>Прочее: <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.stringify(contact.other))}} /></div>}
            <button onClick={() => onEdit(contact)}>Редактировать</button>
            <button onClick={() => onDelete(contact)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 