import React from 'react'

// Part Component. Renders the name and number of exercises of one part.
const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

export default Part