import React, { useState } from 'react';
import axios from 'axios';

function WordInputPage() {
  const [word, setWord] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`http://127.0.0.1:5000/vector?word=${word}`)
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="word-input-page">
      <h1 className="title">Vector Inference</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Word:
          <input className="input" type="text" value={word} onChange={handleInputChange} />
        </label>
        <button className="button" type="submit">Submit</button>
      </form>

      {response && (
        <div className="response">
          <h2 className="response-title">vector representation of: {response.word}</h2>
          <p className="response-text">{response.vector.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default WordInputPage;