import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

test('can renders App component', async () => {
  act(() => {
    render(<App />);
  });

  await waitFor(async () => {
    const element = screen.getByTestId('App');
    expect(element).toBeInTheDocument();
  });
});
