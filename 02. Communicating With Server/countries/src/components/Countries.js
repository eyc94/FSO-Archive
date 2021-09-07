import React from 'react'

const Countries = (props) => {
    if (props.countriesToDisplay.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    return (
        <div>
            {props.countriesToDisplay.map(country => 
                <div>{country.name}</div>
            )}
        </div>
    )
}

export default Countries