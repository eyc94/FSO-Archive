import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countryFilter, setCountryFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                console.log(response.data[0].name)
                setCountries(response.data)
            })
    }, [])

    const changeCountryHandler = (event) => {
        setCountryFilter(event.target.value)
    }

    const countriesToShow = countries.filter(country => {
        return country.name.toLowerCase().includes(countryFilter.toLowerCase())
    })

    console.log(countriesToShow.map(country => country.name))

    return (
        <div>
            <div>find countries <input value={countryFilter} onChange={changeCountryHandler} /></div>
            <div>
                {countriesToShow.map(country => 
                    <div>{country.name}</div>
                )}
            </div>
        </div>
    )
}

export default App