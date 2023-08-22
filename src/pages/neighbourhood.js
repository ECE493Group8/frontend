import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import { Alert, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { INPUT_NUMBER_ERROR_0, INPUT_WORD_ERROR, NEIGHBOURHOOD_NUMBER_OF_RESULTS, NEIGHBOURHOOD_PROMPT, NEIGHBOURHOOD_SUBTITLE, NEIGHBOURHOOD_TITLE, MODEL_KEY, MODELS } from '../constants';

function WordNumberPage() {
  const [word, setWord] = useState('');
  const [number, setNumber] = useState(10);
  const [model, setModel] = useState(localStorage.getItem(MODEL_KEY));
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const changeModel = (event) => {
    setModel(event.target.value);
    localStorage.setItem(MODEL_KEY, event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.word2med.com/neighbours?words=${word}&n=${number}&model=${model}`)
      setResponse(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="word-input-page">
      <h1 className="title">{NEIGHBOURHOOD_TITLE}</h1>
      <form onSubmit={handleSubmit} className="form">
        <p className="description">{NEIGHBOURHOOD_SUBTITLE}</p>
        <div className="label">
          <label htmlFor="word-input">{NEIGHBOURHOOD_PROMPT}</label>
          <input
            id="word-input"
            className="input"
            type="text"
            placeholder='e.g. "scoliosis"'
            value={word}
            onChange={(e) => setWord(e.target.value)}
            pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
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
          <label htmlFor="number-input">{NEIGHBOURHOOD_NUMBER_OF_RESULTS}</label>
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
      {errorMessage.length === 0 ?
      response && (
        <div className="response">
          <h2 className="response-title">Related Words</h2>
          <div className="response-text-container">
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Similarity</th>
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
      )
      :
      (
        <div className="response">
        <Alert variant="filled" severity="error">
          <strong>{errorMessage}</strong>
        </Alert>
        </div>
      )
      }
    </div>
  );
}

export default WordNumberPage;
