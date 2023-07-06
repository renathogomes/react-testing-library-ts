import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Testando página NotFound', () => {
  renderWithRouter(<NotFound />);

  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se a pagina mostra a imagem solicidata', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByRole('img');
  expect(image).toHaveTextContent('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
