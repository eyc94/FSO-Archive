import React from 'react'

// Total Component. Renders total number of exercises.
const Total = (props) => {
    return (
        <>
            <p>
                Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
            </p>
        </>
    )
}

export default Total