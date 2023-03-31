import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  // Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme/customTheme';
import MainPage from './components/MainPage';
import LoginPage from './components/login/LoginPage';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>        
      </div>
    </ThemeProvider>
  );
}

export default App;
