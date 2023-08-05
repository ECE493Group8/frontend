import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { INPUT_WORD_ERROR, MODEL_KEY, MODELS } from '../constants';

function WordInputPage() {
  const [word, setWord] = useState('');
  const [model, setModel] = useState(localStorage.getItem(MODEL_KEY));
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const changeModel = (event) => {
    setModel(event.target.value);
    localStorage.setItem(MODEL_KEY, event.target.value);
  };

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios.get(`https://api.word2med.com/vector?word=${word}&model=${model}`)
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
          <input 
            className="input" 
            type="text" 
            value={word} 
            onChange={handleInputChange} 
            placeholder='e.g. "fracture"' 
            pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
            onInvalid={(e) => {
              e.target.setCustomValidity(INPUT_WORD_ERROR);
            }}
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
            required
          />
        </label>
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
