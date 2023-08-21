import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { INPUT_NUMBER_ERROR_5, MODEL_KEY, MODELS, COLORS } from '../constants';

function WordListInputPage() {
    const [words, setWords] = useState('');
    const [n, setN] = useState(10);
    const [model, setModel] = useState(localStorage.getItem(MODEL_KEY));
    const [response, setResponse] = useState(null);
    const [wordList, setWordList] = useState(null);
    const [responseN, setResponseN] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const changeModel = (event) => {
        setModel(event.target.value);
        localStorage.setItem(MODEL_KEY, event.target.value);
    };

    const handleInputChange = (event) => {
        setWords(event.target.value);
    };

    const handleNumberChange = (event) => {
        setN(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const wordsArray = words.split(',').map(word => word.trim());
        axios.get(`https://api.word2med.com/embeddings?${wordsArray.map((word) => `words=${word}`).join('&')}&n=${n}&model=${model}`)
        .then(response => {
            setResponse(response.data.embeddings_list);
            setWordList(response.data.words_list);
            setResponseN(response.data.n);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    };

    const plotData = response && response.map(([x, y], index) => ({
        x: [x],
        y: [y],
        type: 'scatter',
        mode: 'markers',
        name: wordList && wordList[index] && wordList[index].trim(),
        marker: {color: COLORS[Math.floor(index / (responseN + 1))]},
    }));

    return (
        <div className="word-list-input-page">
        <h1 className="title">Vector Visualization</h1>
        <form className="form" onSubmit={handleSubmit}>
            <p className="description">Plot words on a 2D grid</p>
            <label className="label">
            Words (comma separated list of at least 3 words):
            <input 
                className="input" 
                type="text" 
                value={words} 
                onChange={handleInputChange} 
                placeholder='e.g. "herniation, stenosis, fracture"'
                pattern="^([a-zA-Z]+( [a-zA-Z]+)*, ?){2,}([a-zA-Z]+( [a-zA-Z]+)*) ?$" 
                onInvalid={(e) => {
                    e.target.setCustomValidity("Please enter a comma separated list of 3 or more valid words.");
                }}
                onInput={(e) => {
                e.target.setCustomValidity("");
                }}
                required
            />
            </label>
            <label className="label">
            Number:
            <input 
                className="input" 
                type="text" 
                value={n} 
                onChange={handleNumberChange} 
                placeholder='5' 
                pattern="(?:[6-9]|[1-9]\d+)"
                onInvalid={(e) => {
                    e.target.setCustomValidity(INPUT_NUMBER_ERROR_5);
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
            <h2 className="response-title">Plot:</h2>
            <Plot
                data={plotData}
                layout={{
                width: 600,
                height: 600,
                title: '2D Plot',
                xaxis: {
                    title: 'x',
                },
                yaxis: {
                    title: 'y',
                },
                }}
            />
            </div>
        )}
        </div>
    );
}

export default WordListInputPage;
