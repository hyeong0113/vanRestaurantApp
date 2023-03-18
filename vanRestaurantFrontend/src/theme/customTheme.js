import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    h2: {
      fontFamily: 'Manrope, sans-serif',
    },
    h4: {
      fontFamily: 'Manrope, sans-serif',
    },
  },
  palette: {
    primary: {
      main: 'rgba(103, 69, 18, 0.46)',
    },
    // secondary: {
    //   main: '#FFB800',
    // },
    // info: {
    //   main: '#FFF2D0'
    // }
  }
});

export default customTheme;