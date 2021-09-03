import React, { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
    // Save clicks of each button to its own state.
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={() => setGood(good + 1)} text='good' />
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
            <Button handleClick={() => setBad(bad + 1)} text='bad' />
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App