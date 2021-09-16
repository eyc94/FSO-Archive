import React from 'react'

const DeleteButton = (props) => {
    return (
        <>
            <button onClick={props.delPerson}>{props.text}</button>
        </>
    )
}

export default DeleteButton