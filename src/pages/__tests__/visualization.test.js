import React from 'react';
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved, queryAllByTestId } from '@testing-library/react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import WordListInputPage from '../visualization';

describe('Visualization Test Suite', () => {
  jest.setTimeout(200000)
  test('VW VEC 1 VN VEC 1 (FR4)', async () => {
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
  test('VW IEC 1 VN VEC 1', async () => {
    const WORD = 'dog, cat';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });
  test('VW IEC 2 VN VEC 1', async () => {
    const WORD = 'dog, cat, man*';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('VW IEC 3 VN VEC 1', async () => {
    const WORD = 'dog, cat, man7';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('VW IEC 4 VN VEC 1', async () => {
    const WORD = '';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('VW VEC 1 VN IEC 1', async () => {
    const WORD = 'dog, man, cat';
    const NUM_RESULTS = '5';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('VW VEC 1 VN IEC 2', async () => {
    const WORD = 'dog, man, cat';
    const NUM_RESULTS = '7.0';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('VW VEC 1 VN IEC 3', async () => {
    const WORD = 'dog, man, cat';
    const NUM_RESULTS = 'h';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('VW VEC 1 VN IEC 4', async () => {
    const WORD = 'dog, man, cat';
    const NUM_RESULTS = '5*';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('VW VEC 1 VN IEC 5', async () => {
    const WORD = 'dog, man, cat';
    const NUM_RESULTS = '';
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

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });
})