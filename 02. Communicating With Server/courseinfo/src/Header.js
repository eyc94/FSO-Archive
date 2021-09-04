import React from 'react'

// Header Component. Renders name of the course.
const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

export default Header