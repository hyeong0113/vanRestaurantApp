import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme/customTheme';
import MainPage from '../src/components/mainPage/MainPage';
import LoginPage from '../src/components/login/LoginPage';
import SignUpPage from '../src/components/signUp/SignUpPage';
import HistoryFavoritePage from './components/history/HistoryFavoritePage';
import HistoryTopPage from './components/history/HistoryTopPage';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/history/favorite" element={<HistoryFavoritePage />} />
            <Route path="/history/top" element={<HistoryTopPage />} />
          </Routes>
        </Router>        
      </div>
    </ThemeProvider>
  );
}

export default App;
