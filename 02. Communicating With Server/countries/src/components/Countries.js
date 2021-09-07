import React from 'react'

const Countries = (props) => {
    if (props.countriesToDisplay.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (props.countriesToDisplay.length === 1) {
        return (
            <>
                {props.countriesToDisplay.map(country =>
                    <div key={country.alpha3Code}>
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
                    </div>
                )}
            </>
        )
    }

    return (
        <div>
            {props.countriesToDisplay.map(country => 
                <div key={country.alpha3Code}>{country.name}</div>
            )}
        </div>
    )
}

export default Countries