import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  // Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import MainPage from './components/MainPage';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme/customTheme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router>        
      </div>
    </ThemeProvider>
  );
}

export default App;
