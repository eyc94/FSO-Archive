import React from 'react'
import CountryList from './CountryList'

const Countries = (props) => {
    return (
        <CountryList countries={props.countriesToDisplay} />
    )
}

export default Countries