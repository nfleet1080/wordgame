import { render, screen } from '@testing-library/react';
import App from './App';
import GameGrid from './components/GameGrid';

test('renders game board', () => {
  render(<App />);
  const GameBoard =  screen.getByTestId('GameGrid');
  expect(GameBoard).toBeInTheDocument();
});

test('game board has 5 words', () => {
  render(<GameGrid />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders keyboard', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('keyboard has 26 buttons', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});