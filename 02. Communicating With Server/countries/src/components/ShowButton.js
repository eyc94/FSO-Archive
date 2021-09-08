import React, { useState } from 'react'
import CountryInfo from './CountryInfo'

const ShowButton = (props) => {
    const [showInfo, setShowInfo] = useState(false)

    const handleShowInfo = () => {
        setShowInfo(!showInfo)
    }

    return (
        <>
            <button onClick={handleShowInfo}>{showInfo ? 'hide' : 'show'}</button>
            {showInfo && <CountryInfo country={props.country} />}
        </>
    )
}

export default ShowButton