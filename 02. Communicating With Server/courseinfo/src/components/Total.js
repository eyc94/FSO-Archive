import React from 'react'

const Total = (props) => {
    return (
        <>
            <p>
                <strong>Total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises + props.parts[3].exercises} exercises</strong>
            </p>
        </>
    )
}

export default Total