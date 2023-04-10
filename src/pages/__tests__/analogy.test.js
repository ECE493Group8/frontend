import React from 'react';
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved, queryAllByTestId } from '@testing-library/react';
import axios from 'axios';
import ThreeWordInputPage from '../analogy';

describe('Analogy Test Suite', () => {
  test('AW1 VEC 1 and AW2 VEC 1 and AW3 VEC 1 and AN VEC 1 (FR3)', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Click submit and wait for results to be shown
    fireEvent.click(submitButton);
    await waitFor(() => screen.getByText('Analogy completions:'));

    //verify input fields are considered valid:
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);

    //Verify there are the correct number of results
    const resultsTable = screen.getByRole('table');
    const rows = resultsTable.querySelectorAll('tbody > tr');
    expect(rows.length).toBe(parseInt(NUM_RESULTS));

    //Verify each row contains a word and a distance
    rows.forEach(row=> expect(row.textContent).toMatch(/[a-zA-Z_]+[01].[0-9]+/))
  });

  test('AW1 IEC 1 and AW2 VEC 1 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = '2';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(false);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 IEC 2 and AW2 VEC 1 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat*';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(false);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 IEC 3 and AW2 VEC 1 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat cat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(false);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 IEC 4 and AW2 VEC 1 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = '';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(false);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 IEC 1 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = '2';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(false);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 IEC 2 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = 'mouse*';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(false);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 IEC 3 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = 'mouse dog';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(false);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 IEC 4 and AW3 VEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = '';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(false);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 IEC 1 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = '2';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 IEC 2 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant*';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });
  
  test('AW1 VEC 1 and AW2 VEC 1 and AW3 IEC 3 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant trunk';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 IEC 4 and AN VEC 1', async () => {
    const NUM_RESULTS = '10';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = '';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(false);
    expect(numberInput.validity.valid).toBe(true);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 VEC 1 and AN IEC 1', async () => {
    const NUM_RESULTS = '-1';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 VEC 1 and AN IEC 2', async () => {
    const NUM_RESULTS = '5.3';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 VEC 1 and AN IEC 3', async () => {
    const NUM_RESULTS = 'number';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 VEC 1 and AN IEC 4', async () => {
    const NUM_RESULTS = '10*';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

  test('AW1 VEC 1 and AW2 VEC 1 and AW3 VEC 1 and AN IEC 5', async () => {
    const NUM_RESULTS = '';
    const WORD1 = 'rat';
    const WORD2 = 'mouse';
    const WORD3 = 'elephant';
    render(<ThreeWordInputPage />);

    //Verify buttons exist
    const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
    const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
    const word3Input = screen.getByPlaceholderText(/e\.g\. "king"/i);
    const numberInput = screen.getByPlaceholderText(/5/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(word1Input).toBeInTheDocument();
    expect(word2Input).toBeInTheDocument();
    expect(word3Input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(word1Input, { target: { value: WORD1 } });
    fireEvent.change(word2Input, { target: { value: WORD2 } });
    fireEvent.change(word3Input, { target: { value: WORD3 } });
    fireEvent.change(numberInput, { target: { value: NUM_RESULTS } });
    expect(word1Input.value).toBe(WORD1);
    expect(word2Input.value).toBe(WORD2);
    expect(word3Input.value).toBe(WORD3);
    expect(numberInput.value).toBe(NUM_RESULTS);

    //Verify that the input is invalid
    expect(word1Input.validity.valid).toBe(true);
    expect(word2Input.validity.valid).toBe(true);
    expect(word3Input.validity.valid).toBe(true);
    expect(numberInput.validity.valid).toBe(false);
  });

})