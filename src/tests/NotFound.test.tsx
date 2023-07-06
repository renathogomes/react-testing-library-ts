import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Testando página NotFound', () => {
  renderWithRouter(<NotFound />);

  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/page requested not found/i);
  expect(heading).toBeInTheDocument();
});
