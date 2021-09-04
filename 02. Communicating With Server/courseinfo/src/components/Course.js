import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {

    return (
        <div>
            <Header course={props.courses.name} />
            <Content parts={props.courses.parts} />
            <Total parts={props.courses.parts} />
        </div>
    )
}

export default Course