import React from 'react';
import PropTypes from 'prop-types';
import ContactFilter from './ContactFilter';
import ContactTable from './ContactTable';
import Notification from '../Layout/Notification';

const ContactList = ({
  contacts = [],
  filterValues = {},
  onFilter = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onExport = () => {},
  onImport = () => {},
  onSort = () => {},
  sortBy = '',
  sortOrder = 'asc',
  notification = { open: false, message: '', severity: 'info' },
  onCloseNotification = () => {},
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

ContactList.propTypes = {
  contacts: PropTypes.array,
  filterValues: PropTypes.object,
  onFilter: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onExport: PropTypes.func,
  onImport: PropTypes.func,
  onSort: PropTypes.func,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.oneOf(['asc', 'desc']),
  notification: PropTypes.shape({
    open: PropTypes.bool,
    message: PropTypes.string,
    severity: PropTypes.string,
  }),
  onCloseNotification: PropTypes.func,
};

export default ContactList;
