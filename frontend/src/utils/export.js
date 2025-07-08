import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const exportToCSV = (contacts, filename = 'contacts.csv') => {
  const csv = Papa.unparse(contacts);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const exportToXLSX = (contacts, filename = 'contacts.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(contacts);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, filename);
}; 