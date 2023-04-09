import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import ThreeWordInputPage from '../analogy';
test('renders the ThreeWordInputPage component', () => {
  render(<ThreeWordInputPage />);
  const titleElement = screen.getByText(/Analogy Testing/i);
  expect(titleElement).toBeInTheDocument();
});

// test if the page renders the form elements
describe('ThreeWordInputPage', () => {
    test('renders the analogy input', () => {
      render(<ThreeWordInputPage />);
        const word1Input = screen.getByPlaceholderText(/e\.g\. "man"/i);
        expect(word1Input).toBeInTheDocument();

        const word2Input = screen.getByPlaceholderText(/e\.g\. "woman"/i);
        expect(word2Input).toBeInTheDocument();
    });
  
    test('renders the target word input', () => {
      render(<ThreeWordInputPage />);
      const targetInput = screen.getByRole('textbox', { name: /target word/i });
      expect(targetInput).toBeInTheDocument();
    });
  
    test('renders the number input', () => {
      render(<ThreeWordInputPage />);
      const numberInput = screen.getByRole('spinbutton', { name: /number of results/i });
      expect(numberInput).toBeInTheDocument();
    });

    test('renders the submit button', () => {
        render(<ThreeWordInputPage />);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeInTheDocument();
        });

    test('updates state correctly when form elements are changed', () => {
        render(<ThreeWordInputPage />);
        const analogyInput1 = screen.getByPlaceholderText(/e\.g\. "man"/i);
        const analogyInput2 = screen.getByPlaceholderText(/e\.g\. "woman"/i);
        const wordInput = screen.getByLabelText('Target word:');
        const numberInput = screen.getByLabelText('Number of results:');
        fireEvent.change(analogyInput1, { target: { value: 'man' } });
        fireEvent.change(analogyInput2, { target: { value: 'woman' } });
        fireEvent.change(wordInput, { target: { value: 'king' } });
        fireEvent.change(numberInput, { target: { value: '5' } });
        expect(analogyInput1.value).toBe('man');
        expect(analogyInput2.value).toBe('woman');
        expect(wordInput.value).toBe('king');
        expect(numberInput.value).toBe('5');
    });

    test('target word input is required', async () => {
        render(<ThreeWordInputPage />);
        const targetWordInput = screen.getByLabelText('Target word:');
        fireEvent.change(targetWordInput, { target: { value: '' } });
        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        await expect(targetWordInput.validationMessage).toBe('Constraints not satisfied');
      });

      test('submitting the form fetches data', async () => {
        // Mock the axios.get() method to return some test data
        const mockedAxios = jest.spyOn(axios, 'get');
        const testData = {
          a: 'man',
          b: 'woman',
          c: 'king',
          completions: [['queen', 0.2], ['prince', 0.5]],
        };
        mockedAxios.mockResolvedValueOnce({ data: testData });
      
        // Render the component and fill in the form
        render(<ThreeWordInputPage />);
        const analogyInput1 = screen.getByPlaceholderText(/e\.g\. "man"/i);
        const analogyInput2 = screen.getByPlaceholderText(/e\.g\. "woman"/i);
        const targetWordInput = screen.getByLabelText('Target word:');
        const numberInput = screen.getByLabelText('Number of results:');
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.change(analogyInput1, { target: { value: 'man' } });
        fireEvent.change(analogyInput2, { target: { value: 'woman' } });
        fireEvent.change(targetWordInput, { target: { value: 'king' } });
        fireEvent.change(numberInput, { target: { value: '2' } });
        fireEvent.click(submitButton);
        
        await act(async () => {
            await waitFor(() => expect(mockedAxios).toHaveBeenCalledTimes(1));
          });
      });
  });