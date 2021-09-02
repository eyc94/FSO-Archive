import React, { useState } from 'react'

const App = () => {
    const [ counter, setCounter ] = useState(0)

    return (
      <div>
        <div>{counter}</div>
        <button onClick={() => setCounter(counter + 1)}>
          plus
        </button>
        <button onClick={() => setCounter(0)}>
          reset
        </button>
      </div>
    )
}

export default App