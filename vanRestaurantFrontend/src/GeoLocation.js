import { useState, useEffect } from 'react';
const username = 'juneKwak';
const password = 'qwe123';

const authString = btoa(`${username}:${password}`);

const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`
    }
};

function GeoLocation() {
    const [data, setData] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/geo`, requestOptions)
        .then(res => res.json())
        .then(
        (result) => {
            console.log("loaded");
            setData(result);
        },
        (error) => {
            console.log("Not loaded");
        }
        )
    },[])

    useEffect(() => {
        if(data == null) {
            return;
        }
        fetch(`http://127.0.0.1:8080/restaurants/lat/${data.location.lat}/long/${data.location.lng}`, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setRestaurants(result);
            },
            (error) => {
                console.log("Not loaded");
            }
        )
    }, [data])
  return (
    <div>
        {data != null ? <p>{data.location.lat}</p> : null}
    </div>
  );
}

export default GeoLocation;
