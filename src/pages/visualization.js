import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function WordListInputPage() {
    const [words, setWords] = useState('');
    const [n, setN] = useState('');
    const [response, setResponse] = useState(null);
    const [wordList, setWordList] = useState(null);

    const handleInputChange = (event) => {
        setWords(event.target.value);
    };

    const handleNumberChange = (event) => {
        setN(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const wordsArray = words.split(',').map(word => word.trim());
        axios.get(`http://129.128.215.93:5000/embeddings?${wordsArray.map((word) => `words=${word}`).join('&')}&n=${n}`)
        .then(response => {
            setResponse(response.data.embeddings_list);
            setWordList(response.data.words_list);
        })
        .catch(error => {
            console.error(error);
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
            <label className="label">
            Words (comma separated list of at least 3 words):
            <input className="input" type="text" value={words} onChange={handleInputChange} />
            </label>
            <label className="label">
            Number:
            <input className="input" type="number" value={n} onChange={handleNumberChange} />
            </label>
            <button className="button" type="submit">Submit</button>
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