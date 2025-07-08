import React from 'react';
import ContactFilter from './ContactFilter';
import ContactTable from './ContactTable';
import Notification from '../Layout/Notification';

const ContactList = ({
  contacts,
  filterValues,
  onFilter,
  onEdit,
  onDelete,
  onExport,
  onImport,
  onSort,
  sortBy,
  sortOrder,
  notification,
  onCloseNotification
}) => {
  return (
    <>
      <ContactFilter onFilter={onFilter} initialValues={filterValues} />
      <ContactTable
        contacts={contacts}
        onEdit={onEdit}
        onDelete={onDelete}
        onExport={onExport}
        onImport={onImport}
        onSort={onSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={onCloseNotification}
      />
    </>
  );
};

export default ContactList; 