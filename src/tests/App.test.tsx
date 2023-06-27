import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  renderWithRouter(<App />);
  const HomeLink = screen.getByRole('link', { name: /home/i });
  const AboutLink = screen.getByRole('link', { name: /about/i });
  const FavoriteLink = screen.getByRole('link', { name: /favorite pokemon/i });

  expect(HomeLink).toBeInTheDocument();
  expect(AboutLink).toBeInTheDocument();
  expect(FavoriteLink).toBeInTheDocument();
});
