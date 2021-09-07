import React from 'react'

const Countries = (props) => {
    return (
        <div>
            {props.countriesToDisplay.map(country => 
                <div>{country.name}</div>
            )}
        </div>
    )
}

export default Countries