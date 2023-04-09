import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';

function ThreeWordInputPage() {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [word3, setWord3] = useState('');
  const [number, setNumber] = useState(10);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await axios.get(`https://api.word2med.com/analogy?a=${word1}&b=${word2}&c=${word3}&n=${number}`);
    setResponse(response.data);
    // console.log(response.data);
    setWord1(response.data.a);
    setWord2(response.data.b);
    setWord3(response.data.c);
    setIsLoading(false);
  };

  return (
    <div className="three-word-input-page">
      <h1 className="title">Analogy Testing</h1>
      <form onSubmit={handleSubmit} className="form">
        <p className="description" style={{maxWidth: '25em'}}>Apply an analogy to a target word</p>
        <div className="label">
          <label htmlFor="analogy-input-ctr">Analogy:</label>
          <div className="analogy-input-ctr">
            <input type="text" id="word1" className="analogy-input" value={word1} onChange={(e) => setWord1(e.target.value)} required placeholder='e.g. "man"' />
            <span className='analogy-text'>is to</span>
            <input type="text" id="word2" className="analogy-input" value={word2} onChange={(e) => setWord2(e.target.value)} required placeholder='e.g. "woman"'/>
          </div>
        </div>
        <div className="label">
          <label htmlFor="word-input">Target word:</label>
          <input
            id="word-input"
            className="input"
            type="text"
            placeholder='e.g. "king"'
            value={word3}
            onChange={(e) => setWord3(e.target.value)}
            required
          />
        </div>
        <div className="label">
          <label htmlFor="number-input">Number of results:</label>
          <input
            id="number-input"
            className="input"
            type="number"
            placeholder='5'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        {isLoading ? <LoadingButton loading type="submit" variant='contained'>Submit</LoadingButton> : <LoadingButton type="submit" variant='contained'>Submit</LoadingButton>}
      </form>

      {response ? (
        <div className="response">
          <h2 className="response-title">Analogy completions:</h2>
          <div className="response-text-container">
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
                  <td>{parseFloat(completion[1]).toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ):  (
        <span></span>
      )}
    </div>
  );
}
export default ThreeWordInputPage;