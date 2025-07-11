import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, TableSortLabel, Tooltip, Button, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ContactTable = ({ contacts, onEdit, onDelete, onExport, onImport, onSort, sortBy, sortOrder }) => {
  const handleSort = (field) => {
    onSort(field);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => onExport('csv')}>Экспорт CSV</Button>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => onExport('xlsx')}>Экспорт XLSX</Button>
        <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
          Импорт
          <input type="file" accept=".csv,.xlsx" hidden onChange={onImport} />
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'fio'}
                  direction={sortBy === 'fio' ? sortOrder : 'asc'}
                  onClick={() => handleSort('fio')}
                >ФИО</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={sortBy === 'email' ? sortOrder : 'asc'}
                  onClick={() => handleSort('email')}
                >Email</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'phone'}
                  direction={sortBy === 'phone' ? sortOrder : 'asc'}
                  onClick={() => handleSort('phone')}
                >Телефон</TableSortLabel>
              </TableCell>
              <TableCell>Город</TableCell>
              <TableCell>День рождения</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} hover>
                <TableCell>
                  <Avatar src={contact.photo} alt={contact.fio} />
                </TableCell>
                <TableCell>{contact.fio}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.city}</TableCell>
                <TableCell>{contact.birthday}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Редактировать">
                    <IconButton onClick={() => onEdit(contact)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить">
                    <IconButton onClick={() => onDelete(contact)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {/* Кнопка доп. меню */}
                  <MoreMenu contact={contact} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Кнопка и меню дополнительных действий
function MoreMenu({ contact }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Добавить заметку</MenuItem>
        <MenuItem onClick={handleClose}>История</MenuItem>
        <MenuItem onClick={handleClose}>Теги</MenuItem>
      </Menu>
    </>
  );
}

export default ContactTable; 