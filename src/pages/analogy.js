import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';
import { ANALOGY_PROMPT, ANALOGY_SUBTITLE, ANALOGY_TITLE, INPUT_NUMBER_ERROR_0, INPUT_WORD_ERROR, MODELS, MODEL_KEY } from '../constants';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function ThreeWordInputPage() {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [word3, setWord3] = useState('');
  const [number, setNumber] = useState(10);
  const [model, setModel] = useState(localStorage.getItem(MODEL_KEY));
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changeModel = (event) => {
    setModel(event.target.value);
    localStorage.setItem(MODEL_KEY, event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // const response = await axios.get(`https://api.word2med.com/analogy?a=${word1}&b=${word2}&c=${word3}&n=${number}&model=${model}`);
    const response = await axios.get(`http://129.128.215.93:5000/analogy?a=${word1}&b=${word2}&c=${word3}&n=${number}&model=${model}`);
    setResponse(response.data);
    setWord1(response.data.a);
    setWord2(response.data.b);
    setWord3(response.data.c);
    setIsLoading(false);
  };

  return (
    <div className="three-word-input-page">
      <h1 className="title">{ANALOGY_TITLE}</h1>
      <form onSubmit={handleSubmit} className="form">
        <p className="description" style={{maxWidth: '25em'}}>{ANALOGY_SUBTITLE}</p>
        <div className="label">
          <label htmlFor="analogy-input-ctr">{ANALOGY_PROMPT}</label>
          <div className="analogy-input-ctr">
            <input 
              type="text" 
              id="word1" 
              className="analogy-input" 
              value={word1} 
              onChange={(e) => setWord1(e.target.value)} 
              pattern="^[a-zA-Z]+(_[a-zA-Z]+)*$"
              onInvalid={(e) => {
                e.target.setCustomValidity(INPUT_WORD_ERROR);
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              required 
              placeholder='e.g. "man"' 
            />
            <span className='analogy-text'>is to</span>
            <input 
              type="text" 
              id="word2" 
              className="analogy-input" 
              value={word2} 
              onChange={(e) => setWord2(e.target.value)} 
              pattern="^[a-zA-Z]+(_[a-zA-Z]+)*$"
              onInvalid={(e) => {
                e.target.setCustomValidity(INPUT_WORD_ERROR);
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              required
              placeholder='e.g. "woman"'
            />
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
            pattern="^[a-zA-Z]+(_[a-zA-Z]+)*$"
            onInvalid={(e) => {
              e.target.setCustomValidity(INPUT_WORD_ERROR);
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
            placeholder='5'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            pattern="[1-9]\d*"
              onInvalid={(e) => {
                e.target.setCustomValidity(INPUT_NUMBER_ERROR_0);
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
            required
          />
        </div>
        <div className="model-select-list">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Model</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={model}
            label="Model"
            onChange={e => changeModel(e)}
            sx={{ color: "white" }}
          >
            {
              Object.entries(MODELS).map(([model_name, model_id]) => (
                <MenuItem key={model_id} value={model_id}>{model_name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
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
