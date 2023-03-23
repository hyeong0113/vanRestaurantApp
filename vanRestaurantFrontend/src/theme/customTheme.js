import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0
        },
      }
    }
  },
  typography: {
    h2: {
      fontFamily: 'Manrope, sans-serif',
    },
    h4: {
      fontFamily: 'Manrope, sans-serif',
    },
    h5: {
      fontFamily: 'Manrope, sans-serif',
    },
    body1: {
      fontFamily: 'Manrope, sans-serif',
    }
  },
  palette: {
    primary: {
      main: '#EFC677',
    },
    error: {
      main: '#EF7474',
    },
    // info: {
    //   main: '#FFF2D0'
    // }
  }
});

export default customTheme;