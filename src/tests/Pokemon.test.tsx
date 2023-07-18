import { fireEvent, screen, waitFor } from '@testing-library/react';
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
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    expect(pokemonImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', async () => {
    const linkDetail = await screen.findByRole('link', { name: /More details/i });
    expect(linkDetail).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);

    expect(linkDetail).toHaveTextContent('More details');
  });
  test('Testa se ao clicar no link de navegação do Pokemon, é feito o redirecionamento da aplicação para a pagina de detalhes', async () => {
    const linkDetail = screen.getByRole('link', { name: 'More details' });

    fireEvent.click(linkDetail);
    const checkPokemon = screen.getByText('Pokémon favoritado?');

    fireEvent.click(checkPokemon);

    const pokemonStar = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(pokemonStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    await waitFor(() => {
      expect(screen.getByLabelText(/Pokémon favoritado/i)).toBeInTheDocument();
    });
  });
});
