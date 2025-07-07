import React, { useState, useEffect } from 'react';

export default function ContactForm({ initial, onSave, loading }) {
  const [form, setForm] = useState({
    fio: '', city: '', position: '', birthday: '', car: '', phones: '', emails: '', notes: '', other: '', photo: null
  });

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        phones: initial.phones ? initial.phones.join(', ') : '',
        emails: initial.emails ? initial.emails.join(', ') : '',
        other: initial.other ? JSON.stringify(initial.other) : '',
        photo: null
      });
    }
  }, [initial]);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="fio" type="text" placeholder="ФИО" value={form.fio} onChange={handleChange} required /> <br />
      <input name="city" type="text" placeholder="Город" value={form.city} onChange={handleChange} /> <br />
      <input name="position" type="text" placeholder="Должность" value={form.position} onChange={handleChange} /> <br />
      <input name="birthday" type="text" placeholder="День рождения" value={form.birthday} onChange={handleChange} /> <br />
      <input name="car" type="text" placeholder="Авто" value={form.car} onChange={handleChange} /> <br />
      <input name="phones" type="text" placeholder="Телефоны (через запятую)" value={form.phones} onChange={handleChange} /> <br />
      <input name="emails" type="text" placeholder="E-mail (через запятую)" value={form.emails} onChange={handleChange} /> <br />
      <input name="notes" type="text" placeholder="Заметки" value={form.notes} onChange={handleChange} /> <br />
      <input name="other" type="text" placeholder='Прочее (JSON: {"telegram":"@user"})' value={form.other} onChange={handleChange} /> <br />
      <input name="photo" type="file" accept="image/*" onChange={handleChange} /> <br />
      <button type="submit" disabled={loading}>{loading ? 'Сохраняю...' : 'Сохранить'}</button>
    </form>
  );
} 