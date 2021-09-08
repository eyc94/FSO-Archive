import React from 'react'
import CountryInfo from './CountryInfo'
import ShowButton from './ShowButton'

const CountryList = (props) => {
    // If there are more than 10 countries.
    if (props.countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (props.countries.length === 1) { // If 1 country results.
        return (
            <>
                {props.countries.map(country =>
                    <CountryInfo key={country.alpha3Code} country={country} />
                )}
            </>
        )
    } else { // If 1-10 countries result.
        return (
            <div>
                {props.countries.map(country => 
                    <div key={country.alpha3Code}>
                        {country.name}
                        <ShowButton country={country} />
                    </div>
                )}
            </div>
        )
    }
}


export default CountryList