import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa requisito 6', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { route: '/' });
  });

  test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('scr', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
    const linkDetail = screen.getByRole('link', { name: /More details/i });
    expect(linkDetail).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);

    /*  pokemonList.forEach(async (pokemon) => {
      await userEvent.click(linkDetail);
    }); */

    expect(linkDetail).toHaveTextContent('More details');
  });
});
