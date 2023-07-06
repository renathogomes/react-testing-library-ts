import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa o requisito 3', () => {
  test('Testa se a mensagem "No favorite pokemon found" é exibida na tela caso a pessoa não tenha Pokémon favorito ', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    const FavoriteFound = screen.getByText(/No favorite pokémon found/i);

    expect(FavoriteFound).toBeInTheDocument();
  });

  test('Testa se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [pokemonList[0]] } />);

    const name = screen.getByText('Pikachu');
    const type = screen.getByText('Electric');

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
  });
});
