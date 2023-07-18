import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex.tsx', () => {
  const pokemonTestId = 'pokemon-name';
  beforeEach(() => {
    renderWithRouter(<App />, { route: '/' });
  });
  test('Testando os elementos da pagina pokedex', () => {
    const titleH2 = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });
    expect(titleH2).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const pokemonId = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(pokemonId).toBeInTheDocument();
    expect(pokemonId).toHaveTextContent(/próximo pokémon/i);
    pokemonList.forEach(async (pokemon) => {
      await userEvent.click(pokemonId);
      const element = await screen.findByTestId(pokemonTestId);
      expect(element.textContent).toBe(pokemon.name);
    });
  });
  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
    pokemonList.forEach(async (pokemon) => {
      const typeButton = screen.getByRole('button', { name: new RegExp(pokemon.type, 'i') });
      await userEvent.click(typeButton);
      const element = screen.getByTestId(pokemonTestId);
      expect(element.textContent).toBe('Pikachu');
    });
  });
  test('Teste se o botão All está sempre visível', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const listPokemon = screen.getAllByTestId(pokemonTestId);
    expect(listPokemon.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro passando no teste', () => {
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilter.length).toBe(7);
    pokemonList.forEach((pokemon) => {
      expect(screen.getByRole('button', { name: new RegExp(pokemon.type, 'i') })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
});
