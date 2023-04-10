import React from 'react';
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved, queryAllByTestId } from '@testing-library/react';
import axios from 'axios';
import WordInputPage from '../vector';

describe('Neighbourhood Test Suite', () => {
  test('VIW VEC 1 (FR1)', async () => {
    const WORD = 'rat';
    render(<WordInputPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "fracture"/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(wordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(wordInput, { target: { value: WORD } });
    expect(wordInput.value).toBe(WORD);

    //Click submit and wait for results to be shown
    fireEvent.click(submitButton);
    await waitFor(() => screen.getByText('Vector representation of'), { timeout: 100000 });

    //verify input fields are considered valid:
    expect(wordInput.validity.valid).toBe(true);

    //Validate the results
    const vector = await waitFor(() => document.getElementsByClassName('response-text-container')[0]);
    expect(vector.textContent).toMatch(/^(-?[0-9]+.[0-9]*, )*-?[0-9]+.[0-9]*$/);
  });

  test('VIW IEC 1', async () => {
    const WORD = 'rat2';
    render(<WordInputPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "fracture"/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(wordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(wordInput, { target: { value: WORD } });
    expect(wordInput.value).toBe(WORD);

    //verify input fields are considered invalid:
    expect(wordInput.validity.valid).toBe(false);
  });

  test('VIW IEC 2', async () => {
    const WORD = 'rat*';
    render(<WordInputPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "fracture"/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(wordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(wordInput, { target: { value: WORD } });
    expect(wordInput.value).toBe(WORD);

    //verify input fields are considered invalid:
    expect(wordInput.validity.valid).toBe(false);
  });

  test('VIW IEC 3', async () => {
    const WORD = 'rat dog';
    render(<WordInputPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "fracture"/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(wordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(wordInput, { target: { value: WORD } });
    expect(wordInput.value).toBe(WORD);

    //verify input fields are considered invalid:
    expect(wordInput.validity.valid).toBe(false);
  });

  test('VIW IEC 1', async () => {
    const WORD = '';
    render(<WordInputPage />);

    //Verify buttons exist
    const wordInput = screen.getByPlaceholderText(/e\.g\. "fracture"/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(wordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    //prefill buttons with test values
    fireEvent.change(wordInput, { target: { value: WORD } });
    expect(wordInput.value).toBe(WORD);

    //verify input fields are considered invalid:
    expect(wordInput.validity.valid).toBe(false);
  });
})