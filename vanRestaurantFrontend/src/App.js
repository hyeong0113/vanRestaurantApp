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

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HistoryFavoritePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUpPage />} /> */}
          </Routes>
        </Router>        
      </div>
    </ThemeProvider>
  );
}

export default App;
