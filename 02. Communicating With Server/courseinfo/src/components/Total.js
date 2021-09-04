import React from 'react'

const Total = (props) => {
    // The reduce function reduces an array to a single value.
    // In this case, it is the sum of the values of the array.
    // 's' is the accumulator.
    // 'p' is the current value in the array.
    // If you don't set an initial value of the accumulator, it uses the first value of the array.
    const sum = props.parts.reduce((s, p) => {
        return s + p.exercises
    }, 0) // The 0 here is the initial value.

    return (
        <>
            <p>
                <strong>Total of {sum} exercises</strong>
            </p>
        </>
    )
}

export default Total