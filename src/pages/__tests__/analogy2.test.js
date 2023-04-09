import React from 'react';
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import ThreeWordInputPage from '../analogy';

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
  const numberInput = screen.getByRole('spinbutton', { name: /number of results/i });
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

  //Press submit and wait for results
  fireEvent.click(submitButton);
  await waitFor(() => screen.getByText('Analogy completions:'));

  //Verify there are 10 results
  const resultsTable = screen.getByRole('table');
  const rows = resultsTable.querySelectorAll('tbody > tr');
  expect(rows.length).toBe(parseInt(NUM_RESULTS));

  //Verify each row contains a word and a distance
  rows.forEach(row=> expect(row.textContent).toMatch(/[a-zA-Z_]+[01].[0-9]+/))
});