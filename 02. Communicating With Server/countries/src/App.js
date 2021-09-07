import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
    const [countryFilter, setCountryFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                console.log(response.data)
                setCountries(response.data)
            })
    }, [])

    const changeCountryHandler = (event) => {
        setCountryFilter(event.target.value)
    }

    let countriesToShow = countries.filter(country => {
        return country.name.toLowerCase().includes(countryFilter.toLowerCase())
    })

    if (countryFilter === '') {
        countriesToShow = []
    }

    return (
        <div>
            <div>find countries <input value={countryFilter} onChange={changeCountryHandler} /></div>
            <Countries countriesToDisplay={countriesToShow} />
        </div>
    )
}

export default App