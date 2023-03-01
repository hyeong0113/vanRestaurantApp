import './App.css';
import GeoLocation from './components/GeoLocation';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme/customTheme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <GeoLocation />
      </div>
    </ThemeProvider>
  );
}

export default App;
