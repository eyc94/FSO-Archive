import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_2}>{language.name}</li>
                )}
            </ul>
            <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                style={{ maxWidth: 200, height: 'auto' }}
            />
            <h2>Weather in {country.name}</h2>
            <Weather country={country} />
        </div>
    )
}

export default CountryInfo