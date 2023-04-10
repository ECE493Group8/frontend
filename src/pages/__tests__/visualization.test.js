import React from 'react';
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved, queryAllByTestId } from '@testing-library/react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import WordListInputPage from '../visualization';

describe('Neighbourhood Test Suite', () => {
  jest.setTimeout(200000)
  test('VIW VEC 1 (FR1)', async () => {
    const WORD = 'dog, cat, cow';
    const NUM_WORDS= '3'
    const NUM_RESULTS = '12';
    render(<WordListInputPage />); 

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "herniation, stenosis, fracture"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(wordInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(wordInput, { target: { value: WORD } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(wordInput.value).toBe(WORD);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Click submit and wait for results to be shown
    fireEvent.click(submitButton);
    await waitFor(() => screen.getByText('Plot:'), { timeout: 100000 });

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);

    // find the legend and Verify that we have (n+1)*len(words) items
    const legend = await waitFor(() => document.getElementsByClassName('scrollbox')[0]);
    const items = legend.querySelectorAll('.traces');
    expect(items).toHaveLength((parseInt(NUM_RESULTS) + 1) * parseInt(NUM_WORDS));
  });
})