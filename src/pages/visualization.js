import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';
import Plot from 'react-plotly.js';

function WordListInputPage() {
    const [words, setWords] = useState('');
    const [n, setN] = useState(10);
    const [response, setResponse] = useState(null);
    const [wordList, setWordList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        axios.get(`https://api.word2med.com/embeddings?${wordsArray.map((word) => `words=${word}`).join('&')}&n=${n}`)
        .then(response => {
            setResponse(response.data.embeddings_list);
            setWordList(response.data.words_list);
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
                pattern="^([a-zA-Z]+(_[a-zA-Z]+)*, ?){2,}([a-zA-Z]+(_[a-zA-Z]+)*) ?$" 
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
                pattern="[1-9]\d*"
                onInvalid={(e) => {
                    e.target.setCustomValidity("Please an integer greater than 0.");
                }}
                onInput={(e) => {
                    e.target.setCustomValidity("");
                }}
                required
            />
            </label>
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