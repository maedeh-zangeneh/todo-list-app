import React, { useState } from 'react';

function Advice() {
  const [advice, setAdvice] = useState(""); 

  const getAdvice = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    setAdvice(data.slip.advice);  
  };

  return (
    <div className="mt-4">
      <button className="btn btn-secondary" onClick={getAdvice}>Get Random Advice</button>
      {advice && <p className="mt-3">"{advice}"</p>}
    </div>
  );
}

export default Advice;
