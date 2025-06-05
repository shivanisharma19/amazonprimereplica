import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const navElement = screen.getByText(/Home/);
  expect(navElement).toBeInTheDocument();
});
