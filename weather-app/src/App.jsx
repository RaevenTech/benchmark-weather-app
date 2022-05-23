import React, { useState } from 'react'
import axios from 'axios'
import styles from './App.module.css'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=aa85b613c55a733e7a3bbae9f1cb2fdf`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => { // response: WeatherResponse
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.search}>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text" />
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.location}>
            <p>{data.name}</p>
          </div>
          <div className={styles.temp}>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className={styles.description}>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className={styles.bottom}>
            <div className={styles.feels}>
              {data.main && <p className={styles.bold}>{data.main.feels_like.toFixed()}°C</p> }
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main && <p className={styles.bold}>{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className={styles.wind}>
              {data.wind && <p className={styles.bold}>{data.wind.speed.toFixed()} Kph</p> }
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;