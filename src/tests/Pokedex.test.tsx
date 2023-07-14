import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import pokemonList from '../data';

const renderRepet = () => {
  render(<Pokedex
    pokemonList={ pokemonList }
    favoritePokemonIdsObj={ {} }
  />);
};

test('Testando os elementos da pagina pokedex', () => {
  renderRepet();
  const titleH2 = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });

  expect(titleH2).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
  renderRepet();

  // acessar

  const pokemonId = screen.getByTestId('next-pokemon');
  const img = screen.getAllByRole('img');

  // agir

  await userEvent.click(pokemonId);
  // averiguar

  expect(pokemonId).screen.getByRole('button', { name: /próximo pokémon/i });
  expect(pokemonId).toBeInTheDocument();
  expect(img.length).toBe(1);
});

test('Testa se a Pokédex tem os botões de filtro', () => {
  renderRepet();

  const resetBtn = screen.getByRole('button', { name: /resetar filtro/i });
  expect(resetBtn).toBeInTheDocument();
});
test('Testa se a Pokédex tem os botões de filtro', () => {
  renderRepet();

  const types = screen.getAllByTestId('pokemon-type-button');

  expect(types).toHaveLength(7);
  expect(types[0].textContent).toBe('Electric');
  expect(types[1].textContent).toBe('Fire');
  expect(types[2].textContent).toBe('Bug');
  expect(types[3].textContent).toBe('Poison');
  expect(types[4].textContent).toBe('Psychic');
  expect(types[5].textContent).toBe('Normal');
  expect(types[6].textContent).toBe('Dragon');
});
