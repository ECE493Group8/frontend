import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';

function WordInputPage() {
  const [word, setWord] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios.get(`https://api.word2med.com/vector?word=${word}`)
      .then(response => {
        setResponse(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="word-input-page">
      <h1 className="title">Vector Inference</h1>
      <form className="form" onSubmit={handleSubmit}>
        <p className="description">Get the n-dimensional vector for a word</p>
        <label className="label">
          Word:
          <input className="input" type="text" value={word} onChange={handleInputChange} placeholder='e.g. "fracture"' required/>
        </label>
        {isLoading ? <LoadingButton loading type="submit" variant='contained'>Submit</LoadingButton> : <LoadingButton type="submit" variant='contained'>Submit</LoadingButton>}
      </form>

      {response && (
        <div className="response">
          <h2 className="response-title">Vector representation of <i>{response.word}</i></h2>
          <div className="response-text-container">
          <p className="response-text">{response.vector.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WordInputPage;