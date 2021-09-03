import React from 'react'

const StatisticLine = (props) => {
    if (props.text === 'positive') {
        return (
            <>
                <tr>
                    <td>{props.text}</td>
                    <td>{props.value} %</td>
                </tr>
            </>
        )
    }
    return (
        <>
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
        </>
    )
}

export default StatisticLine