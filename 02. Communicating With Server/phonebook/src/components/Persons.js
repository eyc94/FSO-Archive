import React from 'react'

const Persons = (props) => {
    return (
        <>
            {props.displayArray.map(person =>
                <div key={person.name}>{person.name} {person.number}</div>
            )}
        </>
    )
}

export default Persons