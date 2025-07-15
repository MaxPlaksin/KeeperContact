import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { getToken } from '../utils/auth';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Alert } from '@mui/material';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (err) {
        setError('Ошибка загрузки пользователей');
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>Пользователи</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.is_admin ? 'Администратор' : 'Пользователь'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsersPage; 