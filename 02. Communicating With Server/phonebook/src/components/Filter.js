import React from 'react'

const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.value} onChange={props.changeHandler} />
        </div>
    )
}

export default Filter