import React from 'react';
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved, queryAllByTestId } from '@testing-library/react';
import axios from 'axios';
import WordNumberPage from '../neighbourhood';

describe('Neighbourhood Test Suite', () => {
  test('NW VEC 1 and NN VEC 1 (FR2)', async () => {
    const NUM_RESULTS = '12';
    const WORD = 'rat';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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
    await waitFor(() => screen.getByText('Related Words'), { timeout: 100000 });

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);

    //Verify there are the correct number of results
    const resultsTable = screen.getByRole('table');
    const rows = resultsTable.querySelectorAll('tbody > tr');
    expect(rows.length).toBe(parseInt(NUM_RESULTS));

    //Verify each row contains a word and a distance
    rows.forEach(row=> expect(row.textContent).toMatch(/[a-zA-Z_]+[01].[0-9]+/))
  });

  test('NW IEC 1 and NN VEC 1', async () => {
    const NUM_RESULTS = '12';
    const WORD = '2rat2';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW IEC 2 and NN VEC 1', async () => {
    const NUM_RESULTS = '12';
    const WORD = 'rat$';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW IEC 3 and NN VEC 1', async () => {
    const NUM_RESULTS = '12';
    const WORD = 'rat dog';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW IEC 4 and NN VEC 1', async () => {
    const NUM_RESULTS = '12';
    const WORD = '';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW VEC 1 and NN IEC 1', async () => {
    const NUM_RESULTS = '-2';
    const WORD = 'rat';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW VEC 1 and NN IEC 2', async () => {
    const NUM_RESULTS = '12.5';
    const WORD = 'rat';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW VEC 1 and NN IEC 3', async () => {
    const NUM_RESULTS = 'a';
    const WORD = 'rat';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW VEC 1 and NN IEC 4', async () => {
    const NUM_RESULTS = '12*';
    const WORD = 'rat';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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

  test('NW VEC 1 and NN IEC 5', async () => {
    const NUM_RESULTS = '';
    const WORD = 'rat';
    render(<WordNumberPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "scoliosis"/i);
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