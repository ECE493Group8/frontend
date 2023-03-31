import React, { useState } from 'react';
import axios from 'axios';

function WordNumberPage() {
  const [word, setWord] = useState('');
  const [number, setNumber] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`http://129.128.215.93:5000/neighbours?words=${word}&n=${number}`);
    setResponse(response.data);
  };

  return (
    <div className="word-input-page">
      <h1 className="title">Enter a Word and a Number</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="label">
          <label htmlFor="word-input">Word:</label>
          <input
            id="word-input"
            className="input"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <div className="label">
          <label htmlFor="number-input">Number:</label>
          <input
            id="number-input"
            className="input"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      {response && (
        <div className="response">
          <h2 className="response-title">Closest words to: {response.words[0]}</h2>
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
                  <td>{completion[1]}</td>
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