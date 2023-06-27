import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o requisito 2', () => {
  test('Testar se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const AboutPage = screen.getByText('About Pokédex', { selector: 'h2' });
    const Img = screen.getByRole('img');
    const srcImp = Img.getAttribute('src');

    expect(AboutPage).toBeInTheDocument();
    expect(srcImp).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
