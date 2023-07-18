import { screen } from '@testing-library/react';
import App from '../App';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa requisito 6', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { route: '/' });
  });

  test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonType).toHaveTextContent('Average weight');
  });
});
