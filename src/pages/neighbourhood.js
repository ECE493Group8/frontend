import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';

function WordNumberPage() {
  const [word, setWord] = useState('');
  const [number, setNumber] = useState(10);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await axios.get(`https://api.word2med.com/neighbours?words=${word}&n=${number}`);
    setResponse(response.data);
    setIsLoading(false);
  };

  return (
    <div className="word-input-page">
      <h1 className="title">Neighbourhood Inference</h1>
      <form onSubmit={handleSubmit} className="form">
        <p className="description">Get related words</p>
        <div className="label">
          <label htmlFor="word-input">Word:</label>
          <input
            id="word-input"
            className="input"
            type="text"
            placeholder='e.g. "scoliosis"'
            value={word}
            onChange={(e) => setWord(e.target.value)}
            pattern="^[a-zA-Z]+(_[a-zA-Z]+)*$"
            onInvalid={(e) => {
              e.target.setCustomValidity("Please enter a word. (no letters, spaces, or symbols)");
            }}
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
            required
          />
        </div>
        <div className="label">
          <label htmlFor="number-input">Number of results:</label>
          <input
            id="number-input"
            className="input"
            type="text"
            defaultValue={'10'}
            placeholder='5'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            pattern="[1-9]\d*"
              onInvalid={(e) => {
                e.target.setCustomValidity("Please an integer greater than 0.");
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
            required
          />
        </div>
        {isLoading ? <LoadingButton loading type="submit" variant='contained'>Submit</LoadingButton> : <LoadingButton type="submit" variant='contained'>Submit</LoadingButton>}
      </form>
      {response && (
        <div className="response">
          <h2 className="response-title">Related Words</h2>
          <div className="response-text-container">
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {response.neighbours[0].map((completion, index) => (
                <tr key={index}>
                  <td>{completion[0]}</td>
                  <td>{parseFloat(completion[1]).toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default WordNumberPage;