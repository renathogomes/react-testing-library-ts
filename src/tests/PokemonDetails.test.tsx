import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa requisito 7', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { route: '/pokemon/25' });
  });
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const detailName = screen.getByText('Pikachu Details');
    const moreDetails = screen.queryByText('More Details');
    const titleH2 = screen.getByRole('heading', { name: 'Summary' });
    const resumePokemon = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i);

    expect(detailName).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(titleH2).toBeInTheDocument();
    expect(resumePokemon).toBeInTheDocument();
  });
  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const locationPokemon = screen.getByText('Game Locations of Pikachu');
    const locationOne = screen.getByText('Kanto Viridian Forest');
    const locationTwo = screen.getByText('Kanto Power Plant');
    const image = screen.getAllByRole('img', { name: 'Pikachu location' });

    expect(locationPokemon).toBeInTheDocument();
    expect(locationOne).toBeInTheDocument();
    expect(locationTwo).toBeInTheDocument();
    expect(image[0]).toBeInTheDocument();
    expect(image[1]).toBeInTheDocument();
    expect(image[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  });
  test('Testa se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const checkeBox = screen.getByRole('checkbox');
    /* const labelCheckeBox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckeBox).toBeInTheDocument(); */
    expect(checkeBox).toBeInTheDocument();

    fireEvent.click(checkeBox);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star).toBeInTheDocument();

    fireEvent.click(checkeBox);
    expect(star).not.toBeInTheDocument();
  });
});
