import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o requisito 3', () => {
  test('Testa se a mensagem "No favorite pokemon found" é exibida na tela caso a pessoa não tenha Pokémon favorito ', () => {
    renderWithRouter(<FavoritePokemon />);

    const FavoritText = screen.getByText(/No favorite pokémon found/i);

    expect(FavoritText).toBeInTheDocument();
  });
});
