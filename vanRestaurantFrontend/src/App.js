import './App.css';
import MainPage from './components/MainPage';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme/customTheme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <MainPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
