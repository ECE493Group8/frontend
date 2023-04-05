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
    const response = await axios.get(`http://129.128.215.93:5000/analogy?a=${word1}&b=${word2}&c=${word3}&n=${number}`);
    setResponse(response.data);
    console.log(response.data);
    setWord1(response.data.a);
    setWord2(response.data.b);
    setWord3(response.data.c);
  };

  return (
    <div className="three-word-input-page">
      <h1 className="title">Analogy Testing</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="label">
          <input type="text" id="word1" className="input" value={word1} onChange={(e) => setWord1(e.target.value)} required placeholder='word1' />
          is to  
          <input type="text" id="word2" className="input" value={word2} onChange={(e) => setWord2(e.target.value)} required placeholder='word2'/>
          as 
          <input type="text" id="word3" className="input" value={word3} onChange={(e) => setWord3(e.target.value)} required placeholder='word3'/>
          is to:
        </div>
        <div className="label">
          {response ? (
        <div className="response">
          <h2 className="response-title"></h2>
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
                  <td>{completion[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ):  (
        <div className="no-response"><br></br>Please Complete and submit<br></br> the form to complete the analogy.<br></br><br></br></div>
      )}
        <div className="label">
        <label htmlFor="number">Number:</label>
        <input type="number" id="number" className="input" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </div>
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}
export default ThreeWordInputPage;