import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#19253d', // основной (фон, заголовки)
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffc700', // акцент (кнопки, акценты)
      contrastText: '#19253d',
    },
    background: {
      default: '#f5f5f5', // основной фон, блоки
      paper: '#fff', // карточки, текст
    },
    text: {
      primary: '#19253d', // основной текст
      secondary: '#ffc700', // акцентный текст
    },
    link: {
      main: '#239aff', // ссылки
    },
    action: {
      active: '#239aff', // hover для ссылок
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 900, color: '#19253d' },
    h2: { fontWeight: 700, color: '#19253d' },
    h3: { fontWeight: 700, color: '#19253d' },
    h4: { fontWeight: 700, color: '#19253d' },
    h5: { fontWeight: 700, color: '#19253d' },
    h6: { fontWeight: 700, color: '#19253d' },
    button: { fontWeight: 700, textTransform: 'none' },
    a: { color: '#239aff', textDecoration: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          boxShadow: 'none',
        },
        containedPrimary: {
          background: '#19253d',
          color: '#fff',
        },
        containedSecondary: {
          background: '#ffc700',
          color: '#19253d',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#239aff',
          '&:hover': {
            color: '#19253d',
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

export default theme; 