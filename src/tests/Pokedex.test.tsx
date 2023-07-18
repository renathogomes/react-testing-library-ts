import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente Pokedex', () => {
  const pokemonNameTestId = 'pokemon-name';
  beforeEach(() => {
    renderWithRouter(<App />, { route: '/' });
  });
  it('página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const pokemon = screen.getByText('Pikachu');
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(pokemon).toBeInTheDocument();
    await userEvent.click(nextPokeBtn);
    expect(pokemon).toBeInTheDocument();
  });
  test('Mostra o primeiro poke ao clicar no ultimo poke da lista', async () => {
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');
    await userEvent.click(nextPokeBtn);
    expect(pokeType).toHaveTextContent('Fire');
  });
  test('é mostrado apenas um Pokémon por vez', () => {
    const pokemons = screen.getAllByTestId(pokemonNameTestId);
    expect(pokemons.length).toBe(1);
  });
  test('Teste se os botões de filtragem por tipo têm o nome correto', async () => {
    const mockTypeBtn = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const pokeTypesBtn = screen.getAllByTestId('pokemon-type-button');
    const currentPokemon = screen.getByTestId('pokemon-name');
    pokeTypesBtn.forEach((button, index) => {
      expect(button).toHaveTextContent(mockTypeBtn[index]);
    });
    await userEvent.click(pokeTypesBtn[1]);
    expect(currentPokemon).toHaveTextContent(pokemonList[1].name);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    const allBtn = screen.getByRole('button', { name: /all/i });
    const pokeOnScreen = screen.getByTestId(pokemonNameTestId);
    const pokeTypesBtn = screen.getAllByTestId('pokemon-type-button');
    expect(allBtn).toHaveTextContent('All');
    await userEvent.click(pokeTypesBtn[1]);
    expect(pokeOnScreen).toHaveTextContent('Charmander');
    await userEvent.click(allBtn);
    expect(pokeOnScreen).toHaveTextContent('Pikachu');
  });
});
