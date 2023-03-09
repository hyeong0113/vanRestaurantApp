import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    h6: {
      fontFamily: 'Noto sans, sans-serif;',
    },
    body4: {
      fontFamily: 'Noto sans, sans-serif;',
    }
  },
  palette: {
    primary: {
      main: '#FF9F46',
    },
    secondary: {
      main: '#FFB800',
    },
    info: {
      main: '#FFF2D0'
    }
  }
});

export default customTheme;