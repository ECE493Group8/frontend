import React, { useState } from 'react';
import axios from 'axios';

function ThreeWordInputPage() {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [word3, setWord3] = useState('');
  const [number, setNumber] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`http://127.0.0.1:5000/analogy?a=${word1}&b=${word2}&c=${word3}&n=${number}`);
    setResponse(response.data);
  };

  return (
    <div className="three-word-input-page">
      <h1 className="title">Analogy Testing</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="label">
          <label htmlFor="word1">Word 1:</label>
          <input type="text" id="word1" className="input" value={word1} onChange={(e) => setWord1(e.target.value)} required />
        </div>
        <div className="label">
          <label htmlFor="word2">Word 2:</label>
          <input type="text" id="word2" className="input" value={word2} onChange={(e) => setWord2(e.target.value)} required />
        </div>
        <div className="label">
          <label htmlFor="word3">Word 3:</label>
          <input type="text" id="word3" className="input" value={word3} onChange={(e) => setWord3(e.target.value)} required />
        </div>
        <div className="label">
          <label htmlFor="number">Number:</label>
          <input type="number" id="number" className="input" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
      {response && (
        <div className="response">
          <h2 className="response-title">Best fits for the analogy:</h2>
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {response.completions.map((completion, index) => (
                <tr key={index}>
                  <td>{completion[0]}</td>
                  <td>{completion[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ThreeWordInputPage;