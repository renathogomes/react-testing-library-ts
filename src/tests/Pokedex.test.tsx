import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

const pokemonTypeBtn = 'pokemon-type-button';

const renderRepet = () => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    favoritePokemonIdsObj={ {} }
  />);
};

describe('Testa o requisito 5', () => {
  test('Testando os elementos da pagina pokedex', () => {
    renderRepet();
    const titleH2 = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });

    expect(titleH2).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderRepet();

    const pokemonId = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach(async (pokemon) => {
      await userEvent.click(pokemonId);
      const element = await screen.findByTestId('pokemon-name');

      expect(element).toHaveTextContent(pokemon.name);
    });
  });

  test('Testa se mostra um pokemon por vez', () => {
    renderRepet();

    const pokemons = screen.getAllByTestId('pokemon-name');

    expect(pokemons.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderRepet();

    const types = screen.getAllByTestId(pokemonTypeBtn);

    expect(types).toHaveLength(7);
    expect(types[0].textContent).toBe('Electric');
    expect(types[1].textContent).toBe('Fire');
    expect(types[2].textContent).toBe('Bug');
    expect(types[3].textContent).toBe('Poison');
    expect(types[4].textContent).toBe('Psychic');
    expect(types[5].textContent).toBe('Normal');
    expect(types[6].textContent).toBe('Dragon');
  });
});

test('Testa  se pós a seleção de um botão de tipo, a Pokédex circula somente pelos Pokémon daquele tipo', () => {
  renderRepet();

  const types = screen.getAllByTestId(pokemonTypeBtn);

  types.forEach(async (button) => {
    await userEvent.click(button);

    const pokemon = await screen.findByTestId('pokemon-type');

    expect(pokemon).toHaveTextContent(button.textContent as string);
  });
});

test('Testa se a Pokédex tem os botões de filtro', () => {
  renderRepet();

  const buttonAll = screen.getAllByRole('button');

  expect(buttonAll[0]).toHaveTextContent('All');

  const types = screen.getAllByTestId(pokemonTypeBtn);

  types.forEach(async (button) => {
    await userEvent.click(button);

    const resetBtn = await screen.findByRole('button', { name: /All/i });
    expect(resetBtn).toBeInTheDocument();
  });
});
test('Testa se a pokedex possui os filtros certos', () => {
  renderRepet();

  const types = screen.getAllByTestId(pokemonTypeBtn);

  expect(types.length).toBe(7);

  pokemonList.forEach((pokemon) => {
    expect(screen.getByRole('button', { name: new RegExp(pokemon.type, 'i') })).toBeInTheDocument();
  });

  expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
});
