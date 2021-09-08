import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
    const [countryFilter, setCountryFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const changeCountryHandler = (event) => {
        setCountryFilter(event.target.value)
    }

    const countriesToShow = countries.filter(country => {
        return country.name.toLowerCase().includes(countryFilter.toLowerCase())
    })

    return (
        <div>
            <div>find countries <input value={countryFilter} onChange={changeCountryHandler} /></div>
            <Countries countriesToDisplay={countriesToShow} />
        </div>
    )
}

export default App