import React from 'react'

const StatisticLine = (props) => {
    if (props.text === 'positive') {
        return (
            <div>{props.text} {props.value} %</div>
        )
    }
    return (
        <div>{props.text} {props.value}</div>
    )
}

export default StatisticLine