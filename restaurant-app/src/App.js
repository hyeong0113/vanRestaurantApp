import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`http://127.0.0.1:8080/location`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log("loaded");
        setData(result);
        // setItems(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        // setIsLoaded(true);
        // setError(error);
        console.log("Not loaded");
      }
    )
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {console.log(data)}
    </div>
  );
}

export default App;
