import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = (props) => {
    return (
        <>
            {props.displayArray.map(person =>
                <div key={person.name}>
                    {person.name}
                    {person.number}
                    <DeleteButton delPerson={() => props.delPerson(person)} text="delete" />
                </div>
            )}
        </>
    )
}

export default Persons