import './App.css';
import GeoLocation from './GeoLocation';
// import { useState, useEffect } from 'react';

function App() {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8080/geo`)
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       console.log("loaded");
  //       setData(result);
  //     },
  //     (error) => {
  //       console.log("Not loaded");
  //     }
  //   )
  // },[])
  return (
    <div className="App">
      <GeoLocation />
    </div>
  );
}

export default App;
