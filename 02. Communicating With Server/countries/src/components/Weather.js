import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [weatherInfo, setWeatherInfo] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        console.log('effect')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.name}`)
            .then(response => {
                console.log('promise fulfilled')
                console.log(response.data.current)
                setWeatherInfo({
                    tempC: response.data.current.temperature,
                    icon: response.data.current.weather_icons[0],
                    windSpeed: response.data.current.wind_speed,
                    windDir: response.data.current.wind_dir
                })
            })
    }, [api_key, props.country.name])

    if (weatherInfo === null) {
        return <p>Loading weather info...</p>
    }

    return (
        <>
            <div><strong>Temperature:</strong> {weatherInfo.tempC} Celcius</div>
            <img
                src={weatherInfo.icon}
                alt={`Image of weather for ${props.country.name}`}
                style={{ maxWidth: 200, height: 'auto' }}
            />
            <div><strong>Wind:</strong> {weatherInfo.windSpeed} mph direction {weatherInfo.windDir}</div>
        </>
    )
}

export default Weather