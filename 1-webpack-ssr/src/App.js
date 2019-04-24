import React, { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      This is a nice example
      <div>{counter}</div>
      <button onClick={() => setCounter(counter+1)}>+</button>
      <button onClick={() => setCounter(counter-1)}>-</button>
    </div>
  );
}

export default App;
