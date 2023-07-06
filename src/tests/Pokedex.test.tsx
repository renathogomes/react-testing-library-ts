import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando Pokedex', () => {
  test('Testa se existe um h2 com o título "Encountered Pokémon"', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ {} }
    />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/Encountered Pokémon/i);
  });

  test('Testa se exibe o próximo pokemon depois de clicar no botao', async () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ {} }
    />);

    const nextPokemonId = screen.getByTestId('next-pokemon');
    expect(nextPokemonId).toHaveTextContent(/Próximo Pokémon/i);
    expect(nextPokemonId).toBeInTheDocument();

    await userEvent.click(nextPokemonId);

    const image = screen.getAllByRole('img');
    expect(image.length).toBe(1);
  });
});
